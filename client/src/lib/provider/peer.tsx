'use client';
import React, {
  useMemo,
  useContext,
  useRef,
  useEffect,
  useState,
  ReactNode,
  createContext
} from 'react';

// Define the context value interface
interface PeerContextType {
  peer: RTCPeerConnection;
  createOffer: () => Promise<RTCSessionDescriptionInit>;
  createAnswer: (offer: RTCSessionDescriptionInit) => Promise<RTCSessionDescriptionInit | undefined>;
  setRemoteAnswer: (ans: RTCSessionDescriptionInit) => Promise<void>;
  resetPeer: () => void;
  peerState: string;
}

// Create the context
const PeerContext = createContext<PeerContextType | null>(null);

// Custom hook
export const usePeer = (): PeerContextType => {
  const context = useContext(PeerContext);
  if (!context) {
    throw new Error('usePeer must be used within a PeerProvider');
  }
  return context;
};

// Props type
interface PeerProviderProps {
  children: ReactNode;
}

// Provider component
export const PeerProvider = ({ children }: PeerProviderProps): JSX.Element => {
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const [peerState, setPeerState] = useState<string>("new");
  
  const createNewPeerConnection = (): RTCPeerConnection => {
    
    // Close existing connection if it exists
    if (peerRef.current) {
      // console.log("Closing existing peer connection before creating a new one");
      peerRef.current.close();
    }
    
    // Create new connection
    const newPeer = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'turn:relay.metered.ca:80',
          username: 'openrelayproject',
          credential: 'openrelayproject',
        },
        {
          urls: 'stun:stun.l.google.com:19302' // Optional, for backup
        }
      ],
      iceTransportPolicy: 'relay' 
    });
    
    // Set up connection state monitoring
    newPeer.onconnectionstatechange = () => {
      // console.log(`Peer connection state changed: ${newPeer.connectionState}`);
      setPeerState(newPeer.connectionState);
    };
    
    newPeer.onsignalingstatechange = () => {
      // console.log(`Signaling state changed: ${newPeer.signalingState}`);
      setPeerState(newPeer.signalingState);
    };
    
    newPeer.oniceconnectionstatechange = () => {
      // console.log(`ICE connection state: ${newPeer.iceConnectionState}`);
    };
    
    newPeer.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('New ICE Candidate:', event.candidate);
      }
    };
    
    peerRef.current = newPeer;
    return newPeer;
  };
  
  const getPeerConnection = (): RTCPeerConnection => {
    if (!peerRef.current || peerRef.current.connectionState === 'closed') {
      return createNewPeerConnection();
    }
    return peerRef.current;
  };

  useEffect(() => {
    // Initialize peer on component mount
    const peer = getPeerConnection();
    console.log('Peer initialized:', peer);
    
    return () => {
      // Cleanup on unmount
      if (peerRef.current) {
        // console.log("Closing peer connection on unmount");
        peerRef.current.close();
        peerRef.current = null;
      }
    };
  }, []);

  const createOffer = async (): Promise<RTCSessionDescriptionInit> => {
    const peer = getPeerConnection();
    // console.log("Creating offer with peer in state:", peer.connectionState);
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    // console.log("Local description set:", peer.localDescription);
    return offer;
  };

  const createAnswer = async (
    offer: RTCSessionDescriptionInit
  ): Promise<RTCSessionDescriptionInit | undefined> => {
    const peer = getPeerConnection();
    
    try {
      console.log("Setting remote description on receiver side");
      // if (peer.signalingState === "have-local-offer") {
        await peer.setRemoteDescription(new RTCSessionDescription(offer));
      // }
      if (peer.remoteDescription) {
        console.log("✅ Remote description is set on receiver:");
        console.log(peer.remoteDescription);
        if (peer.signalingState === "have-remote-offer") {
          const answer = await peer.createAnswer();
          await peer.setLocalDescription(answer);
          // console.log("Local answer created:", answer);
          return answer;
        }else{
          console.warn("Skipping createAnswer: current state is", peer.signalingState);
        }
      } else {
        console.log("❌ Remote description is NOT set on receiver");
        return undefined;
      }
    } catch(e) {
      console.error("Error in createAnswer:", e);
      return undefined;
    }
  };

  const setRemoteAnswer = async (ans: RTCSessionDescriptionInit): Promise<void> => {
    const peer = getPeerConnection();
    
    try {
      console.log("Setting remote answer on initiator side");
      console.log(ans);
      if (peer.signalingState === "have-local-offer") {
        await peer.setRemoteDescription(new RTCSessionDescription(ans));
      }
      if (peer.remoteDescription) {
        console.log("✅ Remote answer set successfully:", peer.remoteDescription);
        // console.log("Connection state:", peer.connectionState);
        // console.log("Signaling state:", peer.signalingState);
      } else {
        console.log("❌ Remote answer NOT set");
      }
    } catch (e) {
      console.error("Error setting remote answer:", e);
    }
  };

  const resetPeer = (): void => {
    if (peerRef.current) {
      // console.log("Resetting peer connection");
      peerRef.current.close();
      peerRef.current = null;
      setPeerState("closed");
    }
  };

  // Memoize the context value
  const contextValue = useMemo(
    () => ({
      peer: getPeerConnection(),
      createOffer,
      createAnswer,
      setRemoteAnswer,
      resetPeer,
      peerState
    }),
    [peerState] // Re-create context value when peer state changes
  );

  return (
    <PeerContext.Provider value={contextValue}>
      {children}
    </PeerContext.Provider>
  );
};

export default PeerProvider;