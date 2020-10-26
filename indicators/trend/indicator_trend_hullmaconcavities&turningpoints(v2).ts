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


declare upper;

input price = HL2;
input HMA_Length = 21;
input lookback = 2;

plot HMA = HullMovingAvg(price = price, length = HMA_Length);

# def delta_per_bar =
# (fold n = 0 to lookback with s do s + getValue(HMA, n, lookback - 1)) / lookback;

def delta = HMA[1] - HMA[lookback + 1];
def delta_per_bar = delta / lookback;

def next_bar = HMA[1] + delta_per_bar;

def concavity = if HMA > next_bar then 1 else -1;

plot turning_point = if concavity[1] != concavity then HMA else double.nan;

HMA.AssignValueColor(color = if concavity[1] == -1 then
    if HMA > HMA[1] then color.dark_orange else color.red else
    if HMA < HMA[1] then color.dark_green else color.green);

HMA.SetLineWeight(3);

turning_point.SetLineWeight(4);
turning_point.SetPaintingStrategy(paintingStrategy = PaintingStrategy.POINTS);
turning_point.SetDefaultColor(color.white);

plot MA_Max = if HMA[-1] < HMA and HMA > HMA[1] then HMA else Double.NaN;
MA_Max.SetDefaultColor(Color.WHITE);
MA_Max.SetPaintingStrategy(PaintingStrategy.SQUARES);

#####
# Added Alerts 2020-02-23
Alert(condition = buy, text = "Buy", "alert type" = Alert.BAR, sound = Sound.Chimes);
Alert(condition = sell, text = "Sell", "alert type" = Alert.BAR, sound = Sound.Chimes);