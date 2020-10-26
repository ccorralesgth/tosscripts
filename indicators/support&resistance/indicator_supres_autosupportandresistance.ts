#Auto support or resistance levels

#Notes
# 
# https://usethinkscript.com/threads/programmatic-support-and-resistance-for-thinkorswim.55/

declare upper;

input LookbackPeriod = 5;
input HideCurrentTF = no;
input HideTimeFrame2 = no;
input HideTimeFrame3 = no;
input TimeFrame2 = {"15 MIN", "1 MIN", "2 MIN", "3 MIN", "4 MIN", "5 MIN", "10 MIN", "20 MIN", "30 MIN", "1 HOUR", "2 HOURS", "4 HOURS", DAY, "2 DAYS", "3 DAYS", "4 DAYS", default WEEK, MONTH, "OPT EXP"};
input TimeFrame3 = {"30 MIN", "1 MIN", "2 MIN", "3 MIN", "4 MIN", "5 MIN", "10 MIN", "15 MIN", "20 MIN", "1 HOUR", "2 HOURS", "4 HOURS", DAY, "2 DAYS", "3 DAYS", "4 DAYS", WEEK, default MONTH, "OPT EXP"};
input HideSwings = no;
input SwingsLagBar = 1;

#--------------------------------------------------------------
def _highInPeriod1 = Highest(high, LookbackPeriod);
def _lowInPeriod1 = Lowest(low, LookbackPeriod);
#--------------------------------------------------------------
def marketLow1 = if _lowInPeriod1 < _lowInPeriod1[-LookbackPeriod] then _lowInPeriod1 else _lowInPeriod1[-LookbackPeriod];
def _markedLow1 = low == marketLow1;

rec _lastMarkedLow1 = CompoundValue(1, if IsNaN(_markedLow1) then _lastMarkedLow1[1] else if _markedLow1 then low else _lastMarkedLow1[1], low);
#--------------------------------------------------------------
def marketHigh1 = if _highInPeriod1 > _highInPeriod1[-LookbackPeriod] then _highInPeriod1 else _highInPeriod1[-LookbackPeriod];
def _markedHigh1 = high == marketHigh1;

rec _lastMarkedHigh1 = CompoundValue(1, if IsNaN(_markedHigh1) then _lastMarkedHigh1[1] else if _markedHigh1 then high else _lastMarkedHigh1[1], high);
#--------------------------------------------------------------
plot Resistance1 = _lastMarkedHigh1;
plot Support1 = _lastMarkedLow1;
#--------------------------------------------------------------
Resistance1.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Resistance1.SetDefaultColor(Color.MAGENTA);
Resistance1.SetHiding(HideCurrentTF);
#--------------------------------------------------------------
Support1.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Support1.SetDefaultColor(Color.YELLOW);
Support1.SetHiding(HideCurrentTF);
#--------------------------------------------------------------
def LowSwingForw = Lowest(low, SwingsLagBar)[-SwingsLagBar];
def LowSwingBack = Lowest(low, LookbackPeriod)[1];
def SwingLow = if low < LowSwingForw and low <= LowSwingBack then 1 else 0;
plot LowSwing = if SwingLow then low else Double.NaN;
LowSwing.hide();
#--------------------------------------------------------------
def HighSwingForw = Highest(high, SwingsLagBar)[-SwingsLagBar];
def HighSwingBack = Highest(high, LookbackPeriod)[1];
def SwingHigh = if high > HighSwingForw and high >= HighSwingBack then 1 else 0;
plot HighSwing = if SwingHigh then high else Double.NaN;
HighSwing.hide();
#--------------------------------------------------------------
HighSwing.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
HighSwing.SetLineWeight(5);
HighSwing.SetDefaultColor(Color.MAGENTA);
HighSwing.SetHiding(HideSwings);
LowSwing.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
LowSwing.SetLineWeight(5);
LowSwing.SetDefaultColor(Color.YELLOW);
LowSwing.SetHiding(HideSwings);
#--------------------------------------------------------------
Alert(HighSwing, "SupRes : Swing High", Alert.BAR, Sound.Bell);
Alert(LowSwing, "SupRes : Swing Low", Alert.BAR, Sound.Bell);
#--------------------------------------------------------------
AddLabel(HighSwing, "SupRes : Swing High", Color.MAGENTA);
AddLabel(LowSwing, "SupRes : Swing Low", Color.YELLOW);
#--------------------------------------------------------------
def _highInPeriod2 = Highest(high(period = TimeFrame2), LookbackPeriod);
def _lowInPeriod2 = Lowest(low(period = TimeFrame2), LookbackPeriod);
#--------------------------------------------------------------
def marketLow2 = if _lowInPeriod2 < _lowInPeriod2[-LookbackPeriod] then _lowInPeriod2 else _lowInPeriod2[-LookbackPeriod];
def _markedLow2 = low(period = TimeFrame2) == marketLow2;

rec _lastMarkedLow2 = CompoundValue(1, if IsNaN(_markedLow2) then _lastMarkedLow2[1] else if _markedLow2 then low(period = TimeFrame2) else _lastMarkedLow2[1], low(period = TimeFrame2));
#--------------------------------------------------------------
def marketHigh2 = if _highInPeriod2 > _highInPeriod2[-LookbackPeriod] then _highInPeriod2 else _highInPeriod2[-LookbackPeriod];
def _markedHigh2 = high(period = TimeFrame2) == marketHigh2;

rec _lastMarkedHigh2 = CompoundValue(1, if IsNaN(_markedHigh2) then _lastMarkedHigh2[1] else if _markedHigh2 then high(period = TimeFrame2) else _lastMarkedHigh2[1], high(period = TimeFrame2));
#--------------------------------------------------------------
plot Resistance2 = _lastMarkedHigh2;
Resistance2.hide();
plot Support2 = _lastMarkedLow2;
Support2.hide();
#--------------------------------------------------------------
Resistance2.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Resistance2.SetDefaultColor(Color.MAGENTA);
Resistance2.SetHiding(HideTimeFrame2);
#--------------------------------------------------------------
Support2.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Support2.SetDefaultColor(Color.YELLOW);
Support2.SetHiding(HideTimeFrame2);
#--------------------------------------------------------------
def _highInPeriod3 = Highest(high(period = TimeFrame3), LookbackPeriod);
def _lowInPeriod3 = Lowest(low(period = TimeFrame3), LookbackPeriod);
#--------------------------------------------------------------
def marketLow3 = if _lowInPeriod3 < _lowInPeriod3[-LookbackPeriod] then _lowInPeriod3 else _lowInPeriod3[-LookbackPeriod];
def _markedLow3 = low(period = TimeFrame3) == marketLow3;

rec _lastMarkedLow3 = CompoundValue(1, if IsNaN(_markedLow3) then _lastMarkedLow3[1] else if _markedLow3 then low(period = TimeFrame3) else _lastMarkedLow3[1], low(period = TimeFrame3));
#--------------------------------------------------------------
def marketHigh3 = if _highInPeriod3 > _highInPeriod3[-LookbackPeriod] then _highInPeriod3 else _highInPeriod3[-LookbackPeriod];
def _markedHigh3 = high(period = TimeFrame3) == marketHigh3;

rec _lastMarkedHigh3 = CompoundValue(1, if IsNaN(_markedHigh3) then _lastMarkedHigh3[1] else if _markedHigh3 then high(period = TimeFrame3) else _lastMarkedHigh3[1], high(period = TimeFrame3));
#--------------------------------------------------------------
plot Resistance3 = _lastMarkedHigh3;
Resistance3.hide();
plot Support3 = _lastMarkedLow3;
Support3.hide();
#--------------------------------------------------------------
Resistance3.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Resistance3.SetDefaultColor(Color.MAGENTA);
Resistance3.SetHiding(HideTimeFrame3);
#--------------------------------------------------------------
Support3.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Support3.SetDefaultColor(Color.YELLOW);
Support3.SetHiding(HideTimeFrame3);