declare global {
    interface Window {
        onYouTubeIframeAPIReady(): void;
        YT: any;
    }
}

type Properties = {
    yaw: number;
    pitch: number;
    roll: number;
    fov: number;
}

interface Player {
    cueVideoById(videoId: string, startSeconds?: number): void;
    loadVideoById(videoId: string, startSeconds?: number): void;
    cueVideoByUrl(mediaContentUrl: string, startSeconds?: number): void;
    loadVideoByUrl(mediaContentUrl: string, startSeconds?: number): void;
    cuePlaylist(playlist: string | string[], index: number, startSeconds?: number) : void;

    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    getSphericalProperties(): Properties;
    setSphericalProperties(properties: Properties & { enableOrientationSensor: boolean }): void;
    nextVideo(): void;
    previousVideo(): void;
    playVideoAt(index: number): void;

    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    setVolume(volume: number): void;
    getVolume(): number;

    setSize(width: number, height: number): object;
    getPlaybackRate(): number;
    setPlaybackRate(suggestedRate: number): void;
    getAvailablePlaybackRates(): any[];
    setLoop(loopPlaylists: boolean): void;
    setShuffle(shufflePlaylist: boolean): void;

    getVideoLoadedFraction(): number;
    getPlayerState(): number;
    getCurrentTime(): number;
    
    getDuration(): number;
    getVideoUrl(): string;
    getVideoEmbedCode(): string;
    getPlaylist(): string[];
    getPlaylistIndex(): number;

    addEventListener(event: string, listener: string): void;
    removeEventListener(event: string, listener: string): void;

    getIframe(): HTMLIFrameElement;
    destroy(): void;
}

interface PlayerEvent {
    data: number;
    target: Player;
};

enum PlayerState {
    UNSTARTED = -1,
    ENDED,
    PLAYING,
    PAUSED,
    BUFFERING,
    VIDEO_CUED,
}

export { PlayerState }
export type { Player, PlayerEvent };