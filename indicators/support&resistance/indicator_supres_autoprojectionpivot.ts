#ProjectionPivots_v03_JQ
#03.04.2019
#Original Code and Concept by Mobius:
# V01.08.2012 Projection Pivots
# mobius

# Comments & Tips
# Upon adding the indicator, it will plot several trend lines, support, and resistance channels based on critical pivot points of the stock.
# What I normally do is load this up at the end of each trading day and plot new S/R areas onto my chart based on the suggestion of the Projection Pivots indicator.
# I would also do this at the end of the week as well. It's important that you have these levels up to date on your chart.

# Notes:
# 03.04.2019 added linits on extensions
# 03.05.2019 adjusted limits on extensions by adding user input upper and lower extenion percent limits

# Intrument
#Stock

#declare Once_Per_Bar;
#Inputs
input n = 21;
input showLines = yes;
input showValues = no;
input showBarNumbers = no;
input ExtensionLengthBars = 20; # added to control length of Entension
input UpperExtensionPercentLimit = 5;
input LowerExtensionPercentLimit = 5;
input DisplayLabel = yes;    #JQ 7.8.2018 added
    addlabel (DisplayLabel, "Projection Pivots n:" + n + " " , color.WHITE);    #JQ 7.8.2018 added

 
# Universal Header _v030429019 _JQ
#     code from various sources including Mobius, NoLongerNube and others
# Comment out unnecessary portions to preserve tos memory and enhance speed

# Universal Definitions using Padawan variable naming convention (JQ) v03.04.2019
# iData Definitions
    def vHigh = high;  # creates the variable vHigh.  Use of the variable reduce data calls to tos iData server
#    def initHigh =  CompoundValue(1, high, high);  # creates and initialized variable for High
    def vLow = low;
#    def initLow = CompoundValue(1, low, low);
    def vOpen = open;
#    def initOpen = CompoundValue(1, open, open);
    def vClose = close;
#    def initClose = CompoundValue(1, close, close);
    def vVolume = volume;
#    def initVolume = CompoundValue(1, volume, volume);
    def nan = Double.NaN;
# Bar Time & Date
    def bn = BarNumber();
    def currentBar = HighestAll(if !IsNaN(vHigh) then bn else nan);
#    def Today = GetDay() ==GetLastDay();
#    def time = GetTime();
#    def GlobeX = GetTime() < RegularTradingStart(GetYYYYMMDD());
    # def globeX_v2 = if time crosses below RegularTradingEnd(GetYYYYMMDD()) then bn else GlobeX[1];
#    def RTS  = RegularTradingStart(GetYYYYMMDD());
#    def RTE  = RegularTradingEnd(GetYYYYMMDD());
#    def RTH = GetTime() > RegularTradingStart(GetYYYYMMDD());
#    def RTH_v2 = if time crosses above RegularTradingStart(GetYYYYMMDD()) then bn else RTH[1];

# bars that start and end the sessions  #(borrowed from nube)
#    def rthStartBar    = CompoundValue(1,
#                         if   !IsNaN(vClose)
#                         &&   time crosses above RegularTradingStart(GetYYYYMMDD())
#                         then bn
#                         else rthStartBar[1], 0);
#    def rthEndBar      = CompoundValue(1,
#                         if   !IsNaN(vClose)
#                         &&   time crosses above RegularTradingEnd(GetYYYYMMDD())
#                         then bn
#                         else rthEndBar[1], 1);
#    def globexStartBar = CompoundValue(1,
#                         if   !IsNaN(vClose)
#                         &&   time crosses below RegularTradingEnd(GetYYYYMMDD())
#                         then bn
#                         else globexStartBar[1], 1);
#    def rthSession = if   bn crosses above rthStartBar #+ barsExtendedBeyondSession
#                     then 1
#                     else if   bn crosses above rthEndBar #+ barsExtendedBeyondSession
#                          then 0
#                     else rthSession[1];

# Bubble Locations
    def x_AxisLastExpansionBar = BarNumber() == HighestAll(BarNumber());  #corrected 11.12.2018 (JQ) 
        # syntax: addChartBubble(x_AxisLastExpansionBar, y-axis coordinate," text", Color.LIME); #verified 12.25.2018 (JQ)

def PH;
   def PL;
   def hh = fold i = 1 to n + 1
            with p = 1
            while p
            do vHigh > getValue(vHigh, -i);
       PH = if (bn > n and
                vHigh == highest(vHigh, n) and
                hh)
            then vHigh
            else double.NaN;
   def ll = fold j = 1 to n + 1
            with q = 1
            while q
            do vLow < getValue(low, -j);
       PL = if (bn > n and
                vLow == lowest(vLow, n) and
                ll)
            then vLow
            else double.NaN;
   def PHBar = if !isNaN(PH)
               then bn
               else PHBar[1];
   def PLBar = if !isNaN(PL)
               then bn
               else PLBar[1];
   def PHL = if !isNaN(PH)
             then PH
             else PHL[1];
   def priorPHBar = if PHL != PHL[1]
                    then PHBar[1]
                    else priorPHBar[1];
   def PLL = if !isNaN(PL)
             then PL
             else PLL[1];
   def priorPLBar = if PLL != PLL[1]
                    then PLBar[1]
                    else priorPLBar[1];
   def HighPivots = bn >= highestAll(priorPHBar);
   def LowPivots = bn >= highestAll(priorPLBar);
   def FirstRpoint = if HighPivots
                     then bn - PHBar
                     else 0;
   def PriorRpoint = if HighPivots
                     then bn - PriorPHBar
                     else 0;
   def RSlope = (getvalue(PH, FirstRpoint) - getvalue(PH, PriorRpoint))
                       / (PHBar - PriorPHBar);
   def FirstSpoint = if LowPivots
                     then bn - PLBar
                     else 0;
   def PriorSpoint = if LowPivots
                     then bn - PriorPLBar
                     else 0;
   def SSlope = (getvalue(PL, FirstSpoint) - getvalue(PL, PriorSpoint))
                   / (PLBar - PriorPLBar);
   def RExtend = if bn == highestall(PHBar)
                 then 1
                 else RExtend[1];
   def SExtend = if bn == highestall(PLBar)
                 then 1
                 else SExtend[1];

  plot pivotHigh = if HighPivots
                   then PH
                   else double.NaN;
       pivotHigh.SetDefaultColor(GetColor(1));
       pivotHigh.setPaintingStrategy(PaintingStrategy.VALUES_ABOVE);
       pivotHigh.setHiding(!showValues);

  plot pivotHighLine = if PHL > 0 and
                          HighPivots
                       then PHL
                       else double.NaN;
       pivotHighLine.SetPaintingStrategy(PaintingStrategy.DASHES);  # Mobius original was DASHES
       pivotHighLine.setDefaultColor(color.uptick);    #JQ 7.8.2018 added
       pivotHighLine.setHiding(!showLines);

  plot RLine = pivotHigh;
       RLine.enableApproximation();
       RLine.SetDefaultColor(Color.LIGHT_GRAY);
       RLine.SetStyle(Curve.Short_DASH);

# Added code to limit resistance estension line (JQ 03.04.2019)
  def calc_ResistanceExtension = if RExtend
                    then (bn - PHBar) * RSlope + PHL
                    else double.NaN;
  plot line_ResistanceExtension = if bn <= (Currentbar + ExtensionLengthBars)
                                   and calc_ResistanceExtension[1] >=  (lowestall(vLow) * (1-(lowerExtensionPercentLimit/100)))
                                   and calc_ResistanceExtension[1] <= (Highestall(vHigh) * (1 + (upperExtensionPercentLimit/100)))
                               then calc_ResistanceExtension else double.nan;
       line_ResistanceExtension.SetStyle(Curve.Short_DASH);
       line_ResistanceExtension.SetDefaultColor(color.LIGHT_GRAY); #was 7
       line_ResistanceExtension.setLineWeight(1);

# Low Plots
  plot pivotLow = if LowPivots
                  then PL
                  else double.NaN;
       pivotLow.setDefaultColor(GetColor(4));
       pivotLow.setPaintingStrategy(PaintingStrategy.VALUES_BELOW);
       pivotLow.setHiding(!showValues);

  plot pivotLowLine = if PLL > 0 and
                         LowPivots
                      then PLL
                      else double.NaN;
       pivotLowLine.SetPaintingStrategy(PaintingStrategy.DASHES);  # Mobius original was DASHES
       pivotLowLine.setDefaultColor(color.DOWNTICK);#  #  JQ 7.8.2018 added
       pivotLowLine.setHiding(!showLines);

  plot SupportLine = pivotLow;
       SupportLine.enableApproximation();
       SupportLine.SetDefaultColor(color.LIGHT_GRAY);
       SUpportLine.SetStyle(Curve.Short_DASH);

# Added code to limit support estension line (JQ 03.04.2019)
  def calc_SupportExtension = if SExtend
                          then (bn - PLBar) * SSlope + PLL
                          else double.NaN;
  plot line_SupportExtension = if bn <= (Currentbar + ExtensionLengthBars)
                                   and calc_SupportExtension[1] >= (lowestall(vLow) * (1-(lowerExtensionPercentLimit/100)))
                                   and calc_SupportExtension[1] <= (Highestall(vHigh) * (1 + (upperExtensionPercentLimit/100)))
                               then calc_supportExtension else double.nan;
       line_SupportExtension.SetDefaultColor(color.LIGHT_GRAY); #was 7
       line_SupportExtension.SetStyle(Curve.Short_DASH);
       line_SupportExtension.setLineWeight(1);

  plot BarNumbersBelow = bn;
       BarNumbersBelow.SetDefaultColor(GetColor(0));
       BarNumbersBelow.setHiding(!showBarNumbers);
       BarNumbersBelow.SetPaintingStrategy(PaintingStrategy.VALUES_BELOW);

  plot PivotDot = if !isNaN(pivotHigh)
                  then pivotHigh
                  else if !isNaN(pivotLow)
                  then pivotLow
                  else double.NaN;
       pivotDot.SetDefaultColor(GetColor(7));
       pivotDot.SetPaintingStrategy(PaintingStrategy.POINTS);
       pivotDot.SetLineWeight(3);

# End Code