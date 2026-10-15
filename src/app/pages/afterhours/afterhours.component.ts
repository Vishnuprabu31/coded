import { Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Artist {
  name: string;
  style: string;
  time: string;
}

interface Release {
  title: string;
  subtitle: string;
  year: string;
  image: string;
  notes: number[];
}

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './afterhours.component.html',
  styleUrl: './afterhours.component.scss',
})
export class AfterhoursComponent implements OnDestroy {
  readonly days = ['FRIDAY 18 SEP', 'SATURDAY 19 SEP'];
  activeDay = 0;
  menuOpen = false;
  ticketOpen = false;
  reservationComplete = false;
  ticketCount = 1;
  selectedEvent = '';
  selectedRelease = 0;
  playbackPosition = 0;
  isPlaying = false;
  audioMessage = 'Browser-generated instrumental demo preview.';
  private audioContext: AudioContext | null = null;
  private oscillator: OscillatorNode | null = null;
  private playbackStartedAt = 0;
  private playbackTimer: ReturnType<typeof setInterval> | null = null;
  readonly previewLengthSeconds = 16;
  readonly releases: Release[] = [
    { title: 'Blue Hour', subtitle: 'AFTERHOURS / EP', year: '2026', image: 'photo-1470229722913-7c0e2dbbafd3', notes: [220, 261.63, 329.63, 392, 329.63, 293.66, 261.63, 220, 246.94, 293.66, 349.23, 440, 349.23, 293.66, 261.63, 220] },
    { title: 'No Signal', subtitle: 'LARK / SINGLE', year: '2025', image: 'photo-1501386761578-eac5c94b800a', notes: [196, 246.94, 293.66, 392, 349.23, 293.66, 246.94, 220, 196, 246.94, 329.63, 440, 392, 329.63, 246.94, 196] },
    { title: 'Soft Focus', subtitle: 'MARE / SINGLE', year: '2025', image: 'photo-1506157786151-b8491531f063', notes: [174.61, 220, 261.63, 349.23, 293.66, 261.63, 220, 196, 174.61, 220, 293.66, 392, 349.23, 293.66, 220, 174.61] },
  ];
  readonly events = [
    { title: 'AFTERHOURS / FRIDAY', date: '18 SEPTEMBER 2026', detail: 'PIER 36 · DOORS 8 PM · 18+' },
    { title: 'AFTERHOURS / SATURDAY', date: '19 SEPTEMBER 2026', detail: 'PIER 36 · DOORS 8 PM · 18+' },
  ];
  readonly lineups: Artist[][] = [
    [
      { name: 'Lark', style: 'JUNGLE / UK', time: '10:30 PM' },
      { name: 'Operator Bloom', style: 'ELECTRONIC / UK', time: '12:15 AM' },
      { name: 'Mara Lune', style: 'AFROPOP / GH', time: '01:45 AM' },
      { name: 'DJ Sidecar', style: 'HOUSE / SE', time: '03:00 AM' },
    ],
    [
      { name: 'Velvet Static', style: 'ALT POP / UK', time: '10:00 PM' },
      { name: 'Sol Bloom', style: 'HOUSE / KR', time: '11:45 PM' },
      { name: 'Cinder Club', style: 'DANCE / UK', time: '01:30 AM' },
      { name: 'Mare', style: 'ELECTRONIC / US', time: '03:00 AM' },
    ],
  ];

  openTickets(eventName: string): void {
    this.selectedEvent = eventName;
    this.ticketCount = 1;
    this.reservationComplete = false;
    this.ticketOpen = true;
  }

  changeTicketCount(amount: number): void {
    this.ticketCount = Math.max(1, Math.min(6, this.ticketCount + amount));
  }

  selectRelease(index: number): void {
    if (index === this.selectedRelease) return;
    this.stopPreview();
    this.selectedRelease = index;
    this.audioMessage = 'Browser-generated instrumental demo preview.';
  }

  async togglePreview(): Promise<void> {
    if (this.isPlaying && this.audioContext) {
      try {
        await this.audioContext.suspend();
        this.isPlaying = false;
        this.clearPlaybackTimer();
      } catch (error) {
        this.audioMessage = 'Audio preview could not pause. Please try again.';
        console.error('Unable to pause AFTERHOURS audio preview.', error);
      }
      return;
    }

    try {
      if (typeof AudioContext === 'undefined') {
        this.audioMessage = 'Audio preview is not supported in this browser.';
        return;
      }
      this.audioContext ??= new AudioContext();
      await this.audioContext.resume();
      if (this.playbackPosition === 0 || !this.oscillator) this.schedulePreview();
      this.isPlaying = true;
      this.playbackStartedAt = this.audioContext.currentTime - this.playbackPosition;
      this.playbackTimer = setInterval(() => {
        if (!this.audioContext) return;
        this.playbackPosition = Math.min(
          this.previewLengthSeconds,
          this.audioContext.currentTime - this.playbackStartedAt,
        );
        if (this.playbackPosition >= this.previewLengthSeconds) this.stopPreview();
      }, 100);
      this.audioMessage = 'Playing an original browser-generated instrumental preview. No recording is streamed.';
    } catch (error) {
      this.stopPreview();
      this.audioMessage = 'Audio preview could not start. Please try again or check your browser audio settings.';
      console.error('Unable to start AFTERHOURS audio preview.', error);
    }
  }

  seekPreview(event: Event): void {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    const resumePlayback = this.isPlaying;
    this.stopPreview();
    this.playbackPosition = Number(input.value);
    if (resumePlayback) void this.togglePreview();
  }

  get formattedPosition(): string {
    return this.formatTime(this.playbackPosition);
  }

  get formattedDuration(): string {
    return this.formatTime(this.previewLengthSeconds);
  }

  stopPreview(resetPosition = true): void {
    this.clearPlaybackTimer();
    this.isPlaying = false;
    if (this.oscillator) {
      this.oscillator.onended = null;
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = null;
    }
    if (resetPosition) this.playbackPosition = 0;
  }

  ngOnDestroy(): void {
    this.stopPreview();
    void this.audioContext?.close();
  }

  private schedulePreview(): void {
    if (!this.audioContext) return;
    const context = this.audioContext;
    const now = context.currentTime;
    const release = this.releases[this.selectedRelease];
    const oscillator = context.createOscillator();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const offset = this.playbackPosition;
    const remaining = this.previewLengthSeconds - offset;
    oscillator.type = 'sawtooth';
    filter.type = 'lowpass';
    filter.frequency.value = 680;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.025, now + Math.min(0.15, remaining / 2));
    gain.gain.setValueAtTime(0.025, now + Math.max(0, remaining - 0.3));
    gain.gain.linearRampToValueAtTime(0, now + remaining);
    oscillator.frequency.setValueAtTime(release.notes[Math.min(15, Math.floor(offset))], now);
    release.notes.forEach((frequency, index) => {
      const relativeTime = index - offset;
      if (relativeTime > 0) oscillator.frequency.setValueAtTime(frequency, now + relativeTime);
    });
    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);
    oscillator.onended = () => {
      oscillator.disconnect();
      filter.disconnect();
      gain.disconnect();
      if (this.oscillator === oscillator) this.oscillator = null;
    };
    oscillator.start(now);
    oscillator.stop(now + remaining);
    this.oscillator = oscillator;
  }

  private clearPlaybackTimer(): void {
    if (this.playbackTimer !== null) clearInterval(this.playbackTimer);
    this.playbackTimer = null;
  }

  private formatTime(seconds: number): string {
    const rounded = Math.floor(seconds);
    return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, '0')}`;
  }
}
