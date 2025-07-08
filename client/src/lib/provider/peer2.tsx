'use client'
class PeerService {
  public peer: RTCPeerConnection | null = null;

  constructor() {
    this.initPeer();
  }

  private initPeer() {
    this.peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    });

    this.peer.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("ICE Candidate:", event.candidate);
      }
    };
  }

  public async getOffer(): Promise<RTCSessionDescriptionInit | undefined> {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(offer);
      return offer;
    }
  }

  public async getAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit | undefined> {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.peer.createAnswer();
      await this.peer.setLocalDescription(answer);
      return answer;
    }
  }

  public async setRemoteAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
    }
  }

  public close() {
    if (this.peer) {
      this.peer.close();
      this.peer = null;
    }
  }

  public getPeer(): RTCPeerConnection | null {
    return this.peer;
  }
}

export default  PeerService;