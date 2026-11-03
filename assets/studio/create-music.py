import math, wave, struct
from pathlib import Path
rate=22050; seconds=22; out=Path(__file__).resolve().parent/'assets'/'quiet-steps.wav'
chords=[(220,277.18,329.63),(174.61,220,261.63),(130.81,164.81,196),(196,246.94,293.66)]
melody=[440,493.88,523.25,392,440,329.63,392,440,349.23,392,440,329.63,392,329.63,293.66,329.63]
def sample(t):
 fade=min(1,t/1.2,max(0,(seconds-t)/2)); chord=chords[int(t/4)%len(chords)]; pad=sum(math.sin(2*math.pi*f*t)+.18*math.sin(2*math.pi*f*2*t) for f in chord)/len(chord)
 beat=t%1.25; note=melody[int(t/1.25)%len(melody)]; bell=math.exp(-beat*2.7)*(math.sin(2*math.pi*note*t)+.25*math.sin(2*math.pi*note*2*t));return max(-.8,min(.8,fade*(.07*pad+.12*bell)))
with wave.open(str(out),'wb') as w:
 w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes(b''.join(struct.pack('<h',int(sample(i/rate)*32767)) for i in range(seconds*rate)))
print(out)
