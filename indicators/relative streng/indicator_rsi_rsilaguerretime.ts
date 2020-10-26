# RSI in Laguerre Time
# Mobius
# V02.07.2014
# translation of J Elher's code
# Offered by Mobius in Theotrade.com Chat room V06.12.2017. Free for use.
# changed settings for RSI crosses to .1 & .9 THB 7/21/2017
# Changed Settings for RSI crosses back to original .2 & .8 & added Yellow/Cyan line color Markos 6-2018
# https://usethinkscript.com/threads/best-strategies-or-indicator-for-overnight-hold-or-short-term-swing-trading.1379/#post-31419

declare lower;

#Inputs: 

input gamma = .8;

# Variables:
def o;
def h;
def l;
def c;
def CU1;
def CU2;
def CU;
def CD1;
def CD2;
def CD;
def L0;
def L1;
def L2;
def L3;
plot RSI;
plot OS;
plot OB;

# Calculations
o = (open + close[1]) / 2;
h = Max(high, close[1]);
l = Min(low, close[1]);
c = (o + h + l + close) / 4;

L0 = (1 – gamma) * c + gamma * L0[1];
L1 = -gamma * L0 + L0[1] + gamma * L1[1];
L2 = -gamma * L1 + L1[1] + gamma * L2[1];
L3 = -gamma * L2 + L2[1] + gamma * L3[1];
if L0 >= L1
then {
    CU1 = L0 - L1;
    CD1 = 0;
} else {
    CD1 = L1 - L0;
    CU1 = 0;
}
if L1 >= L2
then {
    CU2 = CU1 + L1 - L2;
    CD2 = CD1;
} else {
    CD2 = CD1 + L2 - L1;
    CU2 = CU1;
}
if L2 >= L3
then {
    CU = CU2 + L2 - L3;
    CD = CD2;
} else {
    CU = CU2;
    CD = CD2 + L3 - L2;
}

RSI = if CU + CD <> 0 then CU / (CU + CD) else 0;
OS = if IsNaN(close) then Double.NaN else 0.2;
OB = if IsNaN(close) then Double.NaN else 0.8;


addcloud(if rsi>=.8 then rsi else double.nan,.8,color.green,color.Dark_Gray);
addcloud(if rsi<=.2 then .2 else double.nan,rsi,color.red,color.Dark_red);
assignPriceColor(if rsi >=.8 then color.Green else if rsi<=.2 then color.red else color.gray);
###alternate use of color###otherwise use below#
RSI.SetLineWeight(2);
RSI.AssignValueColor(if RSI > .8 or RSI > RSI[1]
                     then Color.Cyan
                     else Color.Yellow);
# End Code

### Below is misc code for Alerts and Clouds ###
#input usealerts = no;
#Alert(usealerts and RSI crosses below .9, "", Alert.BAR, Sound.Bell);
#Alert(usealerts and RSI crosses above .1, "", Alert.BAR, Sound.Bell);

#OS = if IsNaN(close) then Double.NaN else 0.2; #This is for full cloud 
#OB = if IsNaN(close) then Double.NaN else 0.8;
#AddCloud(OB, 1, Color.Green, Color.Green);
#AddCloud(0 , OS, Color.Red, Color.Red);
# End Code