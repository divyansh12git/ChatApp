'use client'
import React,{useMemo,useContext,useRef,useEffect} from "react";


const PeerContext=React.createContext<any>(null);

export const usePeer = () => {
    const context = useContext(PeerContext);
    if (!context) {
        throw new Error("usePeer must be used within a PeerProvider");
    }
    return context;
};

interface PeerProviderProps {
    children: React.ReactNode ;
}



export const PeerProvider = (props: PeerProviderProps): JSX.Element => {
    
    const peerRef = useRef<RTCPeerConnection | null>(null);

    const getPeerConnection = () => {
        if (!peerRef.current) {
            peerRef.current = new RTCPeerConnection({
                iceServers: [
                    { urls: ["stun:stun.l.google.com:19302", "stun:global.stun.twilio.com:3478"] }
                ]
            });
    
            // Handle ICE candidates
            peerRef.current.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log("ICE Candidate:", event.candidate);
                }
            };
        }
        return peerRef.current;
    };


    useEffect(() => {
        // if (!peerRef.current) {
        //     peerRef.current = new RTCPeerConnection({
        //         iceServers: [
        //             { urls: ["stun:stun.l.google.com:19302", "stun:global.stun.twilio.com:3478"] }
        //         ]
        //     });

        //     // Handle ICE candidates
        //     peerRef.current.onicecandidate = (event) => {
        //         if (event.candidate) {
        //             console.log("ICE Candidate:", event.candidate);
        //             // Send candidate to signaling server (if applicable)
        //         }
        //     };
        // }
        getPeerConnection(); // Ensure it's created when component mounts

        return () => {
            peerRef.current?.close();
            peerRef.current = null;
        };
    }, []);
    
    const createOffer = async () => {
        // if (!peerRef.current) throw new Error("Peer connection not initialized");
        const peer = getPeerConnection();
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        return offer;
    };
    
    const createAnswer = async (offer:any) => {
        // if (!peerRef.current) throw new Error("Peer connection not initialized");
    
        // console.log("Received Offer:", offer);
        const peer = getPeerConnection();
        // Ensure we only set the remote description if an offer is received
        if (peer.signalingState === "stable") {
            await peer.setRemoteDescription(new RTCSessionDescription(offer));
        } else {
            console.warn("Unexpected signaling state:", peer.signalingState);
            return;
        }
    
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        return answer;
    };
    
    const setRemoteAnswer = async (ans:any) => {
        // if (!peerRef.current) throw new Error("Peer connection not initialized");
            const peer = getPeerConnection();
        // console.log("Received Answer:", ans);
        // console.log("Current Signaling State before setting answer:", peerRef.current.signalingState);
    
        // Only set remote answer if it's not already in stable state
        if (peer.signalingState === "have-local-offer") {
            await peer.setRemoteDescription(new RTCSessionDescription(ans));
        } else {
            console.warn("Ignoring duplicate or incorrect setRemoteDescription call. Current state:", peer.signalingState);
        }
    
        // console.log("Current Signaling State after setting answer:", peerRef.current.signalingState);
    };
    
    const resetPeer=()=>{
        // const peer = getPeerConnection();
        if (peerRef.current) {
            peerRef.current.close();  
            peerRef.current = null;   
        }
    }

    return <PeerContext.Provider value={{peer: peerRef.current,createOffer, createAnswer,setRemoteAnswer,resetPeer}}>{props.children}</PeerContext.Provider>;

};
export default PeerProvider;