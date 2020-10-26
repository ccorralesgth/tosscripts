# Average Price Movements
# Uses daily average ranges of 5 and 10 (most used) as buy (support) and highs (resistance) areas.

# Assembled by BenTen at useThinkScript.com
# Converted from https://www.tradingview.com/script/eHhGyI6R-CD-Average-Daily-Range-Zones-highs-and-lows-of-the-day/

input aggregationPeriod = AggregationPeriod.DAY;
def open = open(period = aggregationPeriod);
def high = high(period = aggregationPeriod);
def low = low(period = aggregationPeriod);
def dayrange = (high - low);

def r1 = dayrange[1];
def r2 = dayrange[2];
def r3 = dayrange[3];
def r4 = dayrange[4];
def r5 = dayrange[5];
def r6 = dayrange[6];
def r7 = dayrange[7];
def r8 = dayrange[8];
def r9 = dayrange[9];
def r10 = dayrange[10];

def adr_10 = (r1 + r2 + r3 + r4 + r5 + r6 + r7 + r8 + r9 + r10) / 10;
def adr_5 = (r1 + r2 + r3 + r4 + r5) / 5;

def hl1 = (OPEN + (adr_10 / 2));
def ll1 = (OPEN - (adr_10 / 2));
def hl2 = (OPEN + (adr_5 / 2));
def ll2 = (OPEN - (adr_5 / 2));

plot upper2 = hl1;
plot lower1 = ll2;
plot upper1 = hl2;
plot lower2 = ll1;

addCloud(upper2, upper1, color.RED, color.RED);
addCloud(lower1, lower2, color.GREEN, color.GREEN);

upper1.SetDefaultColor(Color.dark_red);
upper2.SetDefaultColor(Color.dark_red);
lower1.SetDefaultColor(Color.dark_green);
lower2.SetDefaultColor(Color.dark_green);