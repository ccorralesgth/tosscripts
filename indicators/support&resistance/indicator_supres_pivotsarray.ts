# Pivot_Array (***Please copy and paste this name to study name above***)
# Mobius
# V01.09.13.2017
# hint: Plots the most recent 4 resistance pivots and support pivots. \n For scanning: Find the study in list of studies then select either BearScan or BullScan as the left side entry in the Scan Wizard and equal to as the center definition and close price as the right side entry.
# https://usethinkscript.com/threads/auto-pivot-points-support-resistance-indicator-for-thinkorswim.158/

# User Inputs
input n = 3; #hint n: periods used for pivot calculations.

# Internal Script Reference
script LinePlot {
    input BarID = 0;
    input Value = 0;
    input BarOrigin = 0;
    def ThisBar = HighestAll(BarOrigin);
    def ValueLine = if BarOrigin == ThisBar
                then Value
                else Double.NaN;
    plot P = if ThisBar - BarID <= BarOrigin
             then HighestAll(ValueLine)
             else Double.NaN;
}
# Variables
def o = open;
def h = high;
def l = low;
def c = close;
def bar = BarNumber();
def BBar = bar == HighestAll(bar);
# Parent High
def ParentHigh = HighestAll(h);
def ParentHBarOrigin = if h == ParentHigh
                       then bar
                       else ParentHBarOrigin[1];
def ParentHBarID = bar - HighestAll(ParentHBarOrigin);
# R1
def hh = fold i = 1 to n + 1
         with p = 1
         while p
         do h > GetValue(h, -i);
def PivotH = if (bar > n and
                 h == Highest(h, n) and
                 hh)
            then h
            else Double.NaN;
def PHValue = if !IsNaN(PivotH)
              then PivotH
              else PHValue[1];
def PHBarOrigin = if !IsNaN(PivotH)
                  then bar
                  else PHBarOrigin[1];
def PHBarID = bar - PHBarOrigin;
# R2
def R2PHValue = if PHBarOrigin != PHBarOrigin[1]
              then PHValue[1]
              else R2PHValue[1];
def R2PHBarOrigin = if PHBarOrigin != PHBarOrigin[1]
                  then PHBarOrigin[1]
                  else R2PHBarOrigin[1];
def R2PHBarID = bar - R2PHBarOrigin;
# R3
def R3PHValue = if R2PHBarOrigin != R2PHBarOrigin[1]
              then R2PHValue[1]
              else R3PHValue[1];
def R3PHBarOrigin = if R2PHBarOrigin != R2PHBarOrigin[1]
                  then R2PHBarOrigin[1]
                  else R3PHBarOrigin[1];
def R3PHBarID = bar - R3PHBarOrigin;
# R4
def R4PHValue = if R3PHBarOrigin != R3PHBarOrigin[1]
              then R3PHValue[1]
              else R4PHValue[1];
def R4PHBarOrigin = if R3PHBarOrigin != R3PHBarOrigin[1]
                  then R3PHBarOrigin[1]
                  else R4PHBarOrigin[1];
def R4PHBarID = bar - R4PHBarOrigin;

# Parent Low
def ParentLow = LowestAll(l);
def ParentLBarOrigin = if l == ParentLow
                       then bar
                       else ParentLBarOrigin[1];
def ParentLBarID = bar - HighestAll(ParentLBarOrigin);
# S1
def ll = fold j = 1 to n + 1
         with q = 1
         while q
         do l < GetValue(l, -j);
def PivotL = if (bar > n and
                 l == Lowest(l, n) and
                 ll)
             then l
             else Double.NaN;
def PLValue = if !IsNaN(PivotL)
              then PivotL
              else PLValue[1];
def PLBarOrigin = if !IsNaN(PivotL)
                  then bar
                  else PLBarOrigin[1];
def PLBarID = bar - PLBarOrigin;
# S2
def S2PLValue = if PLBarOrigin != PLBarOrigin[1]
              then PLValue[1]
              else S2PLValue[1];
def S2PLBarOrigin = if PLBarOrigin != PLBarOrigin[1]
                  then PLBarOrigin[1]
                  else S2PLBarOrigin[1];
def S2PLBarID = bar - S2PLBarOrigin;
# S3
def S3PLValue = if S2PLBarOrigin != S2PLBarOrigin[1]
              then S2PLValue[1]
              else S3PLValue[1];
def S3PLBarOrigin = if S2PLBarOrigin != S2PLBarOrigin[1]
                  then S2PLBarOrigin[1]
                  else S3PLBarOrigin[1];
def S3PLBarID = bar - S3PLBarOrigin;
# S4
def S4PLValue = if S3PLBarOrigin != S3PLBarOrigin[1]
              then S3PLValue[1]
              else S4PLValue[1];
def S4PLBarOrigin = if S3PLBarOrigin != S3PLBarOrigin[1]
                  then S3PLBarOrigin[1]
                  else S4PLBarOrigin[1];
def S4PLBarID = bar - S4PLBarOrigin;

# Plots
plot PR1 = LinePlot(BarID = ParentHBarID,
                    Value = ParentHigh,
                    BarOrigin = HighestAll(ParentHBarOrigin));
     PR1.SetDefaultColor(Color.GREEN);
#addChartBubble(Bar == HighestAll(ParentHBarOrigin), ParentHigh, "High", color.yellow, 1);
plot R1 = LinePlot(BarID = PHBarID,
                   Value = PHValue,
                   BarOrigin = PHBarOrigin);
     R1.SetDefaultColor(Color.GREEN);
addChartBubble(Bar == HighestAll(PHBarOrigin), PHvalue, "R1", color.green, 1);
plot R2 = LinePlot(BarID = R2PHBarID,
                   Value = R2PHValue,
                   BarOrigin = R2PHBarOrigin);
     R2.SetDefaultColor(Color.GREEN);
addChartBubble(Bar == HighestAll(R2PHBarOrigin), PHvalue, "R2", color.green, 1);
plot R3 = LinePlot(BarID = R3PHBarID,
                   Value = R3PHValue,
                   BarOrigin = R3PHBarOrigin);
     R3.SetDefaultColor(Color.GREEN);
addChartBubble(Bar == HighestAll(R3PHBarOrigin), PHvalue, "R3", color.green, 1);
plot R4 = LinePlot(BarID = R4PHBarID,
                   Value = R4PHValue,
                   BarOrigin = R4PHBarOrigin);
     R4.SetDefaultColor(Color.GREEN);
addChartBubble(Bar == HighestAll(R4PHBarOrigin), PHvalue, "R4", color.green, 1);

plot PS1 = LinePlot(BarID = ParentLBarID,
                   Value = ParentLow,
                   BarOrigin = HighestAll(ParentLBarOrigin));
     PS1.SetDefaultColor(Color.RED);
AddChartBubble(Bar == HighestAll(ParentLBarOrigin), ParentLow, "Low", Color.Yellow, 0);
plot S1 = LinePlot(BarID = PLBarID,
                   Value = PLValue,
                   BarOrigin = PLBarOrigin);
     S1.SetDefaultColor(Color.RED);
addChartBubble(Bar == HighestAll(PLBarOrigin), PLvalue, "S1", color.red, 0);
plot S2 = LinePlot(BarID = S2PLBarID,
                   Value = S2PLValue,
                   BarOrigin = S2PLBarOrigin);
     S2.SetDefaultColor(Color.RED);
addChartBubble(Bar == HighestAll(S2PLBarOrigin), PLvalue, "S2", color.red, 0);
plot S3 = LinePlot(BarID = S3PLBarID,
                   Value = S3PLValue,
                   BarOrigin = S3PLBarOrigin);
     S3.SetDefaultColor(Color.RED);
addChartBubble(Bar == HighestAll(S3PLBarOrigin), PLvalue, "S3", color.red, 0);
plot S4 = LinePlot(BarID = S4PLBarID,
                   Value = S4PLValue,
                   BarOrigin = S4PLBarOrigin);
     S4.SetDefaultColor(Color.RED);
addChartBubble(Bar == HighestAll(S4PLBarOrigin), PLvalue, "S4", color.red, 0);
# Signals
def UpSignal;
def DnSignal;
if close crosses above R4
{
    UpSignal = low;
}
else if close crosses above R3
{
    UpSignal = low;
}
else if close crosses above R2
{
    UpSignal = low;
}
else if close crosses above R1
{
    UpSignal = low;
}
else
{
    UpSignal = UpSignal[1];
}
plot UpArrows = if low == UpSignal
                then low
                else double.nan;
     UpArrows.SetPaintingStrategy(PaintingStrategy.Arrow_UP);
     UpArrows.SetDefaultColor(Color.CYAN);
if close crosses below S1
{
    DnSignal = high;
}
else if close crosses below S2
{
    DnSignal = high;
}
else if close crosses below S3
{
    DnSignal = high;
}
else if close crosses below S4
{
    DnSignal = high;
}
else
{
    DnSignal = DnSignal[1];
}
plot DnArrow = if high == DnSignal
               then high
               else double.nan;
DnArrow.SetPaintingStrategy(PaintingStrategy.Arrow_DOWN);
DnArrow.SetDefaultColor(Color.YELLOW);
plot BearScan = if (close crosses below S1) OR
                   (close crosses below S2)
                then close
                else double.nan;
plot BullScan = if (close crosses above R1) OR
                   (close crosses above R2)
                then close
                else double.nan;
# End Code Fractal Array