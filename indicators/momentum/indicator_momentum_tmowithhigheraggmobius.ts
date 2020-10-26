#OneNote Archive Name: TMO True Momentum Oscillator with Higher Aggregation #_Mobius 
#Archive Section: Momentum 
#Suggested Tos Name: TrueMomentumOscillator_w_HigherAggregation_Mobius 
#3Archive Date: 5.15.2018 
#Archive Notes:  
#08:43 Mobius: Well give it a few days to get altered, munched, distorted and #twisted. Then when it get back to being used as intended someone will start #making money with it. 
#08:45 Mobius: Oh and in my view - It's highest and best use is as designed with a #secondary aggregation plotted either on it or with it around 5 to 10 times #higher. 
#"" indicates an addition or adjustment by the OneNote Archivist 
#Original Code Follows 
 
# TMO ((T)rue (M)omentum (O)scillator) With Higher Aggregation 
# Mobius 
# V01.05.2018 
#hint: TMO calculates momentum using the DELTA of price. Giving a much better picture of trend, tend reversals and divergence than momentum oscillators using price. 

#I use a separate daily and weekly lower study with this below. It has served me better than most indicators I have tried over the past 20 years or more
#https://usethinkscript.com/threads/tmo-with-higher-agg_mobius-tsl.91/

declare Lower;

input length = 14;
input calcLength = 5;
input smoothLength = 3;
input agg = AggregationPeriod.FIFTEEN_MIN;

def o = open(period = agg);
def c = close(period = agg);
def data = fold i = 0 to length 
           with s 
           do s + (if c > GetValue(o, i) 
                   then 1 
                   else if c < GetValue(o, i) 
                        then - 1 
                        else 0);
def EMA5 = ExpAverage(data, calcLength);
plot Main = ExpAverage(EMA5, smoothLength);
plot Signal = ExpAverage(Main, smoothLength);
Main.AssignValueColor(if Main > Signal 
                           then Color.GREEN 
                           else Color.RED);
Signal.AssignValueColor(if Main > Signal 
                             then Color.GREEN 
                             else Color.RED);
Signal.HideBubble();
Signal.HideTitle();
AddCloud(Main, Signal, Color.GREEN, Color.RED);
plot zero = if IsNaN(c) then Double.NaN else 0;
zero.SetDefaultColor(Color.GRAY);
zero.HideBubble();
zero.HideTitle();
plot ob = if IsNaN(c) then Double.NaN else Round(length * .7);
ob.SetDefaultColor(Color.GRAY);
ob.HideBubble();
ob.HideTitle();
plot os = if IsNaN(c) then Double.NaN else -Round(length * .7);
os.SetDefaultColor(Color.GRAY);
os.HideBubble();
os.HideTitle();
AddCloud(ob, length, Color.LIGHT_RED, Color.LIGHT_RED, no);
AddCloud(-length, os, Color.LIGHT_GREEN, Color.LIGHT_GREEN); 
# End Code TMO with Higher Aggregation