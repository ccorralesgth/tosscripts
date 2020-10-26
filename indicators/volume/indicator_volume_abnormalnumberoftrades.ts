# Abnormal Number Of Trades Intraday Indicator/Scanner
# https://usethinkscript.com/threads/abnormal-number-of-trades-intraday-indicator-scanner.3171/#post-30451

# Momentum study designed to pick up on unusual number of trades 

declare lower;

def AbnormalTradeMultiplier = 3;
def AvgTradeCountLength = 50;

def TradeCount = tick_count;
def AvgTradeCount = Average(TradeCount, AvgTradeCountLength);
def AbnormalNumberOfTrades = AbnormalTradeMultiplier*AvgTradeCount;
def scan = TradeCount > AbnormalNumberOfTrades;

plot s =scan;



# V2
# declare lower;

# def AbnormalTradeMultiplier = 3;
# def AvgTradeCountLength = 50;

# def TradeCount = tick_count;
# def AvgTradeCount = Average(TradeCount, AvgTradeCountLength);
# def AbnormalNumberOfTrades = AbnormalTradeMultiplier*AvgTradeCount;
# def scan = TradeCount > AbnormalNumberOfTrades;


# plot s =scan and AvgTradeCount > 100;