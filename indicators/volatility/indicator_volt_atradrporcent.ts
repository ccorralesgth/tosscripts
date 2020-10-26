# ATR thats show  percentages of the price

#https://usethinkscript.com/threads/best-atr-adr-indicator-i-came-up-with-today-with.4095/

declare lower;

input length = 14;
input averageType = AverageType.wilders;

plot ATR = MovingAverage(averageType, TrueRange(high, close, low), length);
ATR.SetDefaultColor(GetColor(8));

AddLabel (yes, "ATR: " + Round((ATR / close) * 100, 1) + "%", Color.WHITE);


AddLabel (yes, "ATR: " + round((ATR) , 2), Color.white);


plot ADR = MovingAverage(averageType, high-low, length);
ADR.SetDefaultColor(GetColor(6));

AddLabel (yes, "ADR: " + round((ADR) , 2), Color.light_green);

AddLabel (yes, "ADR: " + Round((ADR / close) * 100, 1) + "%", Color.light_green);