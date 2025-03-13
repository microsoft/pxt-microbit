let strings9 = hex`deadbeef`

while(1)
{
basic.pause(2000)

samples.setSampleRate(0,11000)
samples.playAsync(0, strings9)
samples.setSampleRate(1,11000);
samples.playAsync(1, strings9)
samples.setSampleRate(2,6000);
samples.playAsync(2, strings9)
samples.setSampleRate(3,13000);
samples.playAsync(3, strings9)
}
