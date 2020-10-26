#input variables

input price = close;
input ma1length = 9;
input ma2length = 21;
input averageType = AverageType.SIMPLE;
input mode = {default "Trend Following", "Reversal"};

#setting and ploting ma 
plot MA1 = MovingAverage(averageType, price, ma1length);
MA1.SetDefaultColor(GetColor(0));

plot MA2 = MovingAverage(averageType, price, ma2length);
MA2.SetDefaultColor(GetColor(1));

#logic definition
def crossAbove = MA1 crosses above MA2;
def crossBelow = MA1 crosses below MA2;

def buy;
def sell;


switch (mode) {
case  "Trend Following":
    buy = crossAbove;
    sell = crossBelow;
case  "Reversal":
    buy = crossBelow;
    sell = crossAbove;

}
#labeling
AddLabel(yes,if crossAbove then "Trend Following Active" else "Trend Reversal Active",if crossAbove then Color.Green else Color.RED);

#alert

Alert(Crosses(MA1,MA2, CrossingDirection.ABOVE) ,if crossAbove then "Trend Following is active" else "Trend Reversal is active",Alert.BAR,Sound.Ding );
#chart bubbles
#AddChartBubble(GetYYYYMMDD() != GetYYYYMMDD()[1], high, "O: " + open(period = "DAY") + #"\nChg: " + ( open(period = "DAY") - open(period = "DAY")[1] ), Color.PLUM, yes);

#defining orders
AddOrder(OrderType.BUY_AUTO, buy, tickcolor = Color.WHITE, arrowcolor = Color.GREEN, name = "BUY");
AddOrder(OrderType.SELL_AUTO, sell, tickcolor = Color.WHITE, arrowcolor = Color.RED, name = "SELL");


