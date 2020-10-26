#Descriptions
# This indicator draw a resistance and support line marking 
# the latest closed day price. 

#Timeframe
# Higly recomended for intraday support and resistance levels

#Intruments
# Stocks



input aggregationPeriod = AggregationPeriod.DAY;
input length = 1;
input displace = -1;
input showOnlyLastPeriod = no;
plot PrevDayClose;
if showOnlyLastPeriod and !IsNaN(close(period = aggregationPeriod)[-1]) { PrevDayClose = Double.NaN;
} else { PrevDayClose = Highest(close(period = aggregationPeriod)[-displace], length);
}
PrevDayClose.SetDefaultColor(GetColor(9));
PrevDayClose.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);