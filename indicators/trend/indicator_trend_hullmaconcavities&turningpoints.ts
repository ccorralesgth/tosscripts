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


declare upper;

input price = HL2;
input HMA_Length = 55;
input lookback = 2;

# I read somewhere that it's faster to define nan's and then use the def'd var rather than call double.nan every time.
def nan = double.nan;

plot HMA = HullMovingAvg(price = price, length = HMA_Length);

def delta = HMA[1] - HMA[lookback + 1];
def delta_per_bar = delta / lookback;

def next_bar = HMA[1] + delta_per_bar;

def concavity = if HMA > next_bar then 1 else -1;

plot turning_point = if concavity[1] != concavity then HMA else nan;

HMA.AssignValueColor(color = if concavity[1] == -1 then
    if HMA > HMA[1] then color.dark_orange else color.red else
    if HMA < HMA[1] then color.dark_green else color.green);

HMA.SetLineWeight(3);

turning_point.SetLineWeight(4);
turning_point.SetPaintingStrategy(paintingStrategy = PaintingStrategy.POINTS);
turning_point.SetDefaultColor(color.white);

plot MA_Max = if HMA[-1] < HMA and HMA > HMA[1] then HMA else NaN;
MA_Max.SetDefaultColor(Color.WHITE);
MA_Max.SetPaintingStrategy(PaintingStrategy.SQUARES);
MA_Max.SetLineWeight(3);

plot MA_Min = if HMA[-1] > HMA and HMA < HMA[1] then HMA else Nan;
MA_Min.SetDefaultColor(Color.WHITE);
MA_Min.SetPaintingStrategy(PaintingStrategy.TRIANGLES);
MA_Min.SetLineWeight(3);

plot sell = if turning_point and concavity == -1 then high else nan;
sell.SetDefaultColor(Color.DARK_ORANGE);
sell.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
sell.SetLineWeight(3);

plot buy = if turning_point and concavity == 1 then low else nan;
buy.SetDefaultColor(Color.CYAN);
buy.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
buy.SetLineWeight(3);

def divergence = HMA - next_bar;

addLabel(yes, concat("DIVERGENCE: " , divergence * 10000), color = if concavity < 0 then if divergence[1] > divergence then Color.RED else color.PINK else if divergence[1] < divergence then color.green else color.yellow);

###################
#
# ALERTS
#
###################

Alert(condition = buy, text = "Buy", "alert type" = Alert.BAR, sound = Sound.Bell);

Alert(condition = sell, text = "Sell", "alert type" = Alert.BAR, sound = Sound.Chimes);

###################
#
# 2020-05-01
#
# MOBILE TOS SUPPORT
#
# Each color of the HMA needs to be a separate plot as ToS Mobile
# lacks the ability to assign colors the way ToS Desktop does.
# I recommend a plain colored HMA behind the line
# Set the line color of the HMA above to gray or some neutral
#
# CCD_D -> ConCave Down and Decreasing
# CCD_I -> ConCave Down and Increasing
# CCU_D -> ConCave Up and Decreasing
# CCU_I -> ConCave Up and Increasing
#
###################
plot CCD_D = if concavity == -1 and HMA < HMA[1] then HMA else nan;
CCD_D.SetDefaultColor(Color.RED);
CCD_D.SetLineWeight(3);

plot CCD_I = if concavity == -1 and HMA >= HMA[1] then HMA else nan;
CCD_I.SetDefaultColor(Color.DARK_ORANGE);
CCD_I.SetLineWeight(3);

plot CCU_D = if concavity == 1 and HMA <= HMA[1] then HMA else nan;
CCU_D.SetDefaultColor(COLOR.DARK_GREEN);
CCU_D.SetLineWeight(3);

plot CCU_I = if concavity == 1 and HMA > HMA[1] then HMA else nan;
CCU_I.SetDefaultColor(COLOR.GREEN);
CCU_I.SetLineWeight(3);