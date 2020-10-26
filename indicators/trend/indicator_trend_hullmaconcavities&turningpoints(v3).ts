#
# Hull Moving Average Concavity and Turning Points
#  or
# The Second Derivative of the Hull Moving Average
#
# Author: Seth Urion (Mahsume)
# Version: 2020-05-01 V4
#
# Now with support for ToS Mobile
#
# This code is licensed (as applicable) under the GPL v3
# https://usethinkscript.com/threads/hull-moving-average-turning-points-and-concavity-2nd-derivatives.1803/
# https://usethinkscript.com/threads/hull-moving-average-turning-points-and-concavity-2nd-derivatives.1803/page-14#post-23080
# ----------------------
#
# Hull Moving Average Concavity and Turning Points
#  or
# The Second Derivative of the Hull Moving Average
#
# Author: Seth Urion (Mashume)
# Version: 2020-02-23 V3
# Faster, but not necessarily mathematically as good as the first
#
# This code is licensed (as applicable) under the GPL v3
# https://usethinkscript.com/threads/hull-moving-average-turning-points-and-concavity-2nd-derivatives.1803/
# ----------------------
#
# Multiple Moving Average Concavity and Turning Points
#  or
# The Second Derivative of the A Moving Average
#
# via useThinkScript
# request from chillc15
# Added Arnaud Legoux MA and other Moving Averages
#
# Author: Seth Urion (Mahsume)
# Version: 2020-02-22 V2
#
# This code is licensed (as applicable) under the GPL v3
# https://usethinkscript.com/threads/hull-moving-average-turning-points-and-concavity-2nd-derivatives.1803/
# ----------------------

declare upper;

input price = HL2;
input MA_Length = 21;
input lookback = 2;

input MovingAverage = {default "HMA", "EMA", "SMA", "WMA", "ALMA"};

script ALMA {
# Attributed to Miket
# https://tos.mx/9mznij
# https://usethinkscript.com/threads/alma-arnaud-legoux-ma-indicator-for-thinkorswim.174/
input Data = close;
input Window = 9;
input Sigma = 6;
input Offset = 0.85;

def m = (Offset * (Window - 1));
def s = Window/Sigma;

def SumVectorData = fold y = 0 to Window with WS do WS + Exp(-(sqr(y-m))/(2*sqr(s))) * getvalue(Data, (Window-1)-y);
def SumVector = fold z = 0 to Window with CW do CW + Exp(-(sqr(z-m))/(2*sqr(s)));

plot ALMA = SumVectorData / SumVector;
}

plot MA;
switch (MovingAverage) {
case EMA:
    MA = MovAvgExponential(price, length = MA_Length);
case SMA:
    MA = simpleMovingAvg(price, length = MA_Length);
case WMA:
    MA = wma(price, length = MA_Length);
case ALMA:
    MA = ALMA(Data = price, window = MA_Length);
default:
    MA = HullMovingAvg(price = price, length = MA_Length);
}


def delta = MA[1] - MA[lookback + 1];
def delta_per_bar = delta / lookback;

def next_bar = MA[1] + delta_per_bar;

def concavity = if MA > next_bar then 1 else -1;

plot turning_point = if concavity[-1] != concavity then MA else double.nan;

MA.AssignValueColor(color = if concavity == -1 then
    if MA > MA[1] then color.dark_orange else color.red else
    if MA < MA[1] then color.dark_green else color.green);

MA.SetLineWeight(3);

turning_point.SetLineWeight(4);
turning_point.SetPaintingStrategy(paintingStrategy = PaintingStrategy.POINTS);
turning_point.SetDefaultColor(color.white);

plot MA_Max = if MA[-1] < MA and MA > MA[1] then MA else Double.NaN;
MA_Max.SetDefaultColor(Color.WHITE);
MA_Max.SetPaintingStrategy(PaintingStrategy.SQUARES);
MA_Max.SetLineWeight(3);

plot MA_Min = if MA[-1] > MA and MA < MA[1] then MA else Double.Nan;
MA_Min.SetDefaultColor(Color.WHITE);
MA_Min.SetPaintingStrategy(PaintingStrategy.TRIANGLES);
MA_Min.SetLineWeight(3);

plot sell = if turning_point and concavity == 1 then high else double.nan;
sell.SetDefaultColor(Color.DARK_ORANGE);
sell.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
sell.SetLineWeight(3);

plot buy = if turning_point and concavity == -1 then low else double.nan;
buy.SetDefaultColor(Color.CYAN);
buy.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
buy.SetLineWeight(3);

def divergence = MA - next_bar;

addLabel(yes, concat("DIVERGENCE: " , divergence), color = if concavity < 0 then if divergence[1] > divergence then Color.RED else color.PINK else if divergence[1] < divergence then color.green else color.yellow);