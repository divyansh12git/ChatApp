'use client'
import { Mic, Video, Settings, PhoneOff } from 'lucide-react';
import {useCallback, useEffect, useState, useRef} from "react";
import {useSocket} from "@/lib/provider/socket/socketProvider"
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';
import {end, start} from "@/lib/store/slice/function/videoCall"
import { endIncoming } from '@/lib/store/slice/function/incomingCall';
import {usePeer} from "@/lib/provider/peer"
import { getMockStreamFromImage } from '@/lib/services';

const VideoCall = ({myId, userId, roomId, myProfilePic}:{myId:number, userId:number, roomId:string, myProfilePic:string}) => {
    const username = useSelector((state:RootState) => state.username);
    const videoCallController = useSelector((state:RootState) => state.videoCall);
    const socket = useSocket();
    const dispatch = useDispatch();
    const currentFriend = useSelector((state: RootState) => state.currentFriend);
    const friendId = Number(currentFriend.id);
    
    // Use the peer context with state tracking
    const {peer, createOffer, createAnswer, setRemoteAnswer, resetPeer, peerState} = usePeer();
    
    const [myStream, setMyStream] = useState<MediaStream | null>(null);
    const myStreamRef = useRef<MediaStream | null>(null);
    const [videoShared, setVideoShared] = useState(true);
    const [audioShared, setAudioShared] = useState(true);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const remoteRef = useRef<HTMLVideoElement>(null);
    const [connectionStatus, setConnectionStatus] = useState("Initializing...");
    const [needsUserInteraction, setNeedsUserInteraction]=useState(false);
    // Update the ref when state changes
    useEffect(() => {
        myStreamRef.current = myStream;
    }, [myStream]);

    // Clean up media streams when component unmounts
    const endStream=()=>{
        const stream = myStreamRef.current;
        if (stream) {
            console.log("11: ending stream")
            stream.getTracks().forEach(track => track.stop());
            setMyStream(null);
            myStreamRef.current = null;
        }
        setAudioShared(false);
        setVideoShared(false);
    }

    const handleEndCall=()=>{
        socket.emit('sender-decline',{roomId});
        dispatch(end());
        resetPeer();
        endStream();
    }
    const handleBusy=()=>{
        console.log("user busy...");
        dispatch(end());
        resetPeer();
        endStream();
    }
    
    // Handle when the sender declines the call
    const senderDecline=()=>{
        console.log("yooo");
              dispatch(endIncoming());
              dispatch(end());
            const stream = myStreamRef.current;
            resetPeer();
            endStream();
            setConnectionStatus("Call declined");
    }


    // Start the video call when connection is accepted
    const startVideoCall = async({ans}:{ans:any}) => {
        // console.log("Call accepted, setting remote answer");
        setConnectionStatus("Connecting...");
        
        try {
            await setRemoteAnswer(ans);
            // console.log("Remote answer set, connection should be establishing");
            setConnectionStatus("Connected");
            dispatch(start({ongoing:true, friendId})); 
        } catch (err) {
            console.error("Error setting remote answer:", err);
            setConnectionStatus("Connection failed");
        }
    };

    // Get user media stream
    const getUserMediaStream = useCallback(async () => {
        try {
            // console.log("Requesting media stream");
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            // console.log("Stream obtained:", stream);
            setMyStream(stream);
            setConnectionStatus("Media ready");
        } catch (err:any) {
            // console.error("Failed to get media stream:", err);
            setConnectionStatus("Camera/mic access issue");
            
            if (
                err.name === "NotAllowedError" ||
                err.name === "NotFoundError" ||
                err.name === "NotReadableError" ||
                err.name === "OverconstrainedError"
            ) {
                // console.warn("Falling back to mock image stream...");
                const mockStream = await getMockStreamFromImage("/images/profile/2.png"); 
                setMyStream(mockStream);
                setConnectionStatus("Using fallback stream");
            }
        }
    }, []);

    // Initialize media streams
    useEffect(() => {
        getUserMediaStream();
        
        return () => {
            endStream();
        };
    }, [getUserMediaStream]);

    // Update video element when stream changes
     useEffect(() => {
        if (videoRef.current && myStream) {
            videoRef.current.srcObject = myStream;
        }
    
        return () => {
            if (myStream) {
                myStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [myStream]);

    

    // Toggle audio
    const toggleAudio = () => {
        if (!myStream) return;
        myStream.getAudioTracks().forEach(track => {
            track.enabled = !track.enabled;
            setAudioShared(track.enabled);
        });
    };

    // Toggle video
    const toggleVideo = () => {
        if (!myStream) return;
        myStream.getVideoTracks().forEach(track => {
            track.enabled = !track.enabled;
            setVideoShared(track.enabled);
        });
    };

    // Add local media tracks to the peer connection
    const addTracksOverPeer = useCallback(() => {
        // console.log("Adding tracks to peer connection");
        // console.log("Current peer state:", peerState);
        // console.log("Signaling state:", peer.signalingState);
        
        // Only add tracks if we have a valid connection
        if (peer.signalingState !== 'closed' && myStream) {
            // Remove any existing senders to avoid duplicates
            const senders = peer.getSenders();
            if (senders.length > 0) {
                // console.log("Existing senders found, not adding tracks again");
                return;
            }
            
            // Add tracks from our stream
            myStream.getTracks().forEach(track => {
                try {
                    console.log(`Adding ${track.kind} track to peer connection`);
                    peer.addTrack(track, myStream);
                } catch (err) {
                    console.error("Failed to add track:", err);
                }
            });
        } else {
            console.warn("Cannot add tracks - connection closed or no stream available");
        }
    }, [peer, myStream, peerState]);

    // Listen for tracks from the remote peer
    useEffect(() => {
        const handleTrack = (ev: RTCTrackEvent) => {
            console.log("Received remote track:", ev.track.kind);
            if (ev.streams && ev.streams[0]) {
                console.log("Setting remote stream");
                setRemoteStream(ev.streams[0]);
                setConnectionStatus("Connected with video");
            }
        };

        if (peer) {
            // console.log("adding track event listener ")
            peer.addEventListener("track", handleTrack);
        }

        return () => {
            if (peer) {
                // console.log("removing track event listener ")
                peer.removeEventListener("track", handleTrack);
            }
        };
    }, [peer]);

    useEffect(() => {
        if (!remoteRef.current) return;

        const videoEl = remoteRef.current;
            console.log("Video tracks:", remoteStream?.getVideoTracks());
            console.log("Audio tracks:", remoteStream?.getAudioTracks());
        if (remoteStream) {
            console.log("Attaching remote stream to video element");

            if (videoEl.srcObject !== remoteStream) {
                videoEl.srcObject = remoteStream;
            }

            videoEl.muted = true;

            const playPromise = videoEl.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log("Remote video playback started successfully");
                        setTimeout(() => {
                            videoEl.muted = false;
                        }, 100);
                    })
                    .catch((error) => {
                        console.warn("Video play prevented:", error);
                        setNeedsUserInteraction(true);
                    });
                    }else{
                        console.log("can't promise")
                    }
                } else {
                    console.log("No remote stream available");
                    videoEl.srcObject = null;
                }
    }, [remoteStream]);




    // // Update remote video element when remote stream changes
    // useEffect(() => {
    //     const videoElement = remoteRef.current;

    //     if (videoElement && remoteStream) {
    //         videoElement.srcObject = remoteStream;
    //     }

    //     return () => {
    //         if (videoElement) {
    //             videoElement.srcObject = null;
    //         }
    //     };
    // }, [remoteStream]);

    // Add tracks when call becomes ongoing
    useEffect(() => {
        if (videoCallController?.ongoing && myStream) {
            // console.log("Call is now ongoing, adding tracks");
            addTracksOverPeer();
        }
    }, [videoCallController?.ongoing, addTracksOverPeer]);

    //negotiation logic:
    const handleNegoNeeded=useCallback(async()=>{
        console.log("nego needed--1");
        const offer=await createOffer();
        socket.emit('negotiation:needed',{roomId,offer});
    },[socket]);
    
    const handleNegoNeedIncoming=useCallback(async({roomId,offer}:any)=>{
       console.log("nego needed--2"); 
    //    console.log(offer);
    //    console.log(offer.offer)
        const ans=await createAnswer(offer);
        socket.emit("nego:done",{roomId,ans});
    },[socket]);

    const handleNegoFinal=useCallback(async({roomId,ans}:any)=>{
        await setRemoteAnswer(ans);
        console.log("nego needed--3");
    },[]);

    useEffect(()=>{
        if(peer){
            peer.addEventListener('negotiationneeded', handleNegoNeeded);
        }
        return()=>{
            if(peer){
                peer.removeEventListener('negotiationneeded', handleNegoNeeded);
            }
        }
    },[peer,handleNegoNeeded])

    // Socket event listeners
    useEffect(() => {
        // console.log("Setting up socket listeners");
        
        socket.on('call-busy', handleBusy);
        socket.on("sender-decline", senderDecline);
        socket.on('receiver-accepted', startVideoCall);
        socket.on('receiver-declined', handleBusy);
        socket.on("negotiation:needed",handleNegoNeedIncoming);
        socket.on("nego:final",handleNegoFinal);
        return () => {
            // console.log("Removing socket listeners");
            socket.off('call-busy', handleBusy);
            socket.off("sender-decline", senderDecline);
            socket.off('receiver-accepted', startVideoCall);
            socket.off('receiver-declined', handleBusy);
            socket.off("negotiation:needed",handleNegoNeedIncoming);
            socket.off("nego:final",handleNegoFinal);
        }
    }, [socket]);

    // Display connection state
    useEffect(() => {
        console.log("Peer connection state changed:", peerState);
    }, [peerState]);

    return (
        <div className="flex w-full h-full flex-col justify-center items-center gap-6 bg-[#2d2d30] text-white p-6 relative overflow-hidden">
            <h2 className="text-2xl font-semibold z-10">Video Call: Room {roomId}</h2>
            <div className="text-sm bg-gray-700 px-3 py-1 rounded-full mb-2">
                Status: {connectionStatus} | Peer: {peerState}
            </div>
            
            <div className="flex justify-center w-full gap-6 z-10">
                {/* Local video */}
                <div className="w-80 h-60 rounded-lg border border-gray-500 bg-[#1e1e1e] shadow-lg overflow-hidden relative">
                    <div className="absolute top-2 left-2 bg-black/50 text-xs px-2 py-1 rounded-md">
                        You {audioShared ? '🔊' : '🔇'} {videoShared ? '📹' : '❌'}
                    </div>
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* Remote video */}
                <div className="w-80 h-60 rounded-lg border border-gray-500 bg-[#1e1e1e] shadow-lg overflow-hidden relative">
                    <div className="absolute top-2 left-2 bg-black/50 text-xs px-2 py-1 rounded-md">
                        Remote {remoteStream ? '🔊' : '🔇'} {remoteStream ? '📹' : '❌'}
                    </div>
                    <video 
                        ref={remoteRef} 
                        autoPlay 
                        playsInline 
                        muted // Initially muted to help with autoplay
                        className="w-full h-full object-cover" 
                    />
                    {!remoteStream && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            Waiting for remote video...
                        </div>
                    )}
                    {needsUserInteraction && (
                        <button 
                            className="absolute inset-0 flex items-center justify-center bg-black/70 text-white"
                            onClick={() => {
                                if (remoteRef.current) {
                                    remoteRef.current.muted = false;
                                    remoteRef.current.play()
                                        .then(() => setNeedsUserInteraction(false))
                                        .catch(err => console.error("Play failed after user interaction:", err));
                                }
                            }}
                        >
                            <div className="flex flex-col items-center">
                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                                <span className="mt-2">Click to Play Video</span>
                            </div>
                        </button>
                    )}
                </div>
            </div>
            
            <div className='flex items-center justify-center gap-4 mt-4 bg-[#1e1e1e] p-3 rounded-lg shadow-md z-10'>
                <button 
                    className={`${actionButton} ${!audioShared ? 'bg-red-700' : ''}`} 
                    onClick={toggleAudio}
                >
                    <Mic size={20} />
                </button>
                <button 
                    className={`${actionButton} ${!videoShared ? 'bg-red-700' : ''}`} 
                    onClick={toggleVideo}
                >
                    <Video size={20} />
                </button>
                <button className={actionButton}>
                    <Settings size={20} />
                </button>
                <button className={endCallButton} onClick={handleEndCall}>
                    <PhoneOff size={20} />
                </button>
            </div>
        </div>
    );
};

const actionButton = `bg-gray-700 hover:bg-gray-600 border border-gray-500 rounded-full p-3 text-white transition-all duration-200 shadow-md flex items-center justify-center`;
const endCallButton = `bg-red-600 hover:bg-red-500 border border-red-500 rounded-full p-3 text-white transition-all duration-200 shadow-md flex items-center justify-center`;

export default VideoCall;
