var link = 'https://displaysolutions.samsung.com/led-signage/detail/';
var imgUrl = 'https://vd-dsg.s3.amazonaws.com/logs/upload';
var outdoor = {
    list: [
    {
    DIMENSIONS: "264x264 mm",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "24,960hz",
    PRODUCT_NAME: "XPB160",
    SEQ: 1391,
    BRIGHTNESS: "9,000 nit"
    },
    {
    DIMENSIONS: "330x165 mm",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "49,920hz",
    PRODUCT_NAME: "XPB100",
    SEQ: 1390,
    BRIGHTNESS: "7,500 nit"
    },
    {
    DIMENSIONS: "264x297 mm",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "49,920hz",
    PRODUCT_NAME: "XPB080",
    SEQ: 1389,
    BRIGHTNESS: "7,500 nit"
    },
    {
    DIMENSIONS: "330x165 mm",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "49,920hz",
    PRODUCT_NAME: "XPE100",
    SEQ: 1388,
    BRIGHTNESS: "160° (+/- 80°)"
    },
    {
    DIMENSIONS: "264x297 mm",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "49,920hz",
    PRODUCT_NAME: "XPE080",
    SEQ: 1387,
    BRIGHTNESS: "7,500 nit"
    },
    {
    DIMENSIONS: "203x203 mm",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "49,920hz",
    PRODUCT_NAME: "XPE060",
    SEQ: 1386,
    BRIGHTNESS: "7,500 nit"
    },
    {
    DIMENSIONS: "960x960x154 (per cabinet)",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "?4000 Hz",
    PRODUCT_NAME: "XA160F",
    SEQ: 1129,
    BRIGHTNESS: "7,700 nit"
    },
    {
    DIMENSIONS: "960x960x142 (per cabinet)",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "?2000 Hz",
    PRODUCT_NAME: "XA100F",
    SEQ: 1128,
    BRIGHTNESS: "6,750 nit"
    },
    {
    DIMENSIONS: "1152x864x142 (per cabinet)",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "?2000 Hz",
    PRODUCT_NAME: "XA080F",
    SEQ: 1127,
    BRIGHTNESS: "6,300 nit"
    },
    {
    DIMENSIONS: "1152x864x142 (per cabinet) ",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "?2000 Hz",
    PRODUCT_NAME: "XA060F",
    SEQ: 1126,
    BRIGHTNESS: "6,300 nit"
    },
    {
    DIMENSIONS: "1280x960x168 (per cabinet)",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "?3000",
    PRODUCT_NAME: "XR100F",
    SEQ: 1122,
    BRIGHTNESS: "6,750 nit"
    },
    {
    DIMENSIONS: "264x297 mm (per module)",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "49,920hz",
    PRODUCT_NAME: "XPS080",
    SEQ: 947,
    BRIGHTNESS: "9,000 nit"
    },
    {
    DIMENSIONS: "330x165 mm (per module)",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "49,920hz",
    PRODUCT_NAME: "XPS200",
    SEQ: 821,
    BRIGHTNESS: "9,000 nit"
    },
    {
    DIMENSIONS: "406x203 mm (per module)",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "24,960hz",
    PRODUCT_NAME: "XPS250",
    SEQ: 820,
    BRIGHTNESS: "7,500 nit"
    },
    {
    DIMENSIONS: "264x264 mm (per module)",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "24,960hz",
    PRODUCT_NAME: "XPS160",
    SEQ: 819,
    BRIGHTNESS: "9,000 nit"
    },
    {
    DIMENSIONS: "264x264 mm (per module)",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "49,920hz",
    PRODUCT_NAME: "XPS165",
    SEQ: 818,
    BRIGHTNESS: "7,500 nit"
    },
    {
    DIMENSIONS: "203x203 mm (per module)",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "49,920hz",
    PRODUCT_NAME: "XPS120",
    SEQ: 817,
    BRIGHTNESS: "9,000 nit"
    },
    {
    DIMENSIONS: "330x165 mm (per module)",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "49,920hz",
    PRODUCT_NAME: "XPS100",
    SEQ: 815,
    BRIGHTNESS: "9,000 nit"
    },
    {
    DIMENSIONS: "203x203 mm (per module)",
    CATEGORY: "Outdoor",
    REFRESH_RATE: "49,920hz",
    PRODUCT_NAME: "XPS060",
    SEQ: 814,
    BRIGHTNESS: "9,000 nit"
    }
    ]
};
var indoor = {
    list: [
        {
        DIMENSIONS: "480x540x65mm",
        CATEGORY: "Indoor",
        REFRESH_RATE: "1,920Hz, 3,840 Hz Selectable",
        PRODUCT_NAME: "IF025H-E",
        SEQ: 1340,
        BRIGHTNESS: "2,000 nit / 1,000 nit"
        },
        {
        DIMENSIONS: "480x540x65mm",
        CATEGORY: "Indoor",
        REFRESH_RATE: "1,920Hz, 3,840 Hz Selectable",
        PRODUCT_NAME: "IF015H-E",
        SEQ: 1339,
        BRIGHTNESS: "1,200 nit / 600 nit"
        },
        {
        DIMENSIONS: "806.4x453.6x76.7mm",
        CATEGORY: "Indoor",
        REFRESH_RATE: "3,840 Hz",
        PRODUCT_NAME: "IF012J",
        SEQ: 1279,
        BRIGHTNESS: "1,200 nit / 600 nit"
        },
        {
        DIMENSIONS: "480x720x65mm (per cabinet)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "1,920Hz, 3,840 Hz Selectable",
        PRODUCT_NAME: "IF060H-D",
        SEQ: 1251,
        BRIGHTNESS: "1,800 nit / 1,200 nit"
        },
        {
        DIMENSIONS: "480x720x65 mm (per cabinet)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "1,920Hz, 3,840 Hz Selectable",
        PRODUCT_NAME: "IF040H-D",
        SEQ: 1250,
        BRIGHTNESS: "1,700 nit / 1,200 nit"
        },
        {
        DIMENSIONS: "480x720x65 mm (per cabinet)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "1,920Hz, 3,840 Hz Selectable",
        PRODUCT_NAME: "IF025H-D",
        SEQ: 1249,
        BRIGHTNESS: "2,400 nit / 1,200 nit"
        },
        {
        DIMENSIONS: "330x165 mm (per module)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "49,920hz",
        PRODUCT_NAME: "IPE100",
        SEQ: 1140,
        BRIGHTNESS: "2,000 nit"
        },
        {
        DIMENSIONS: "203x229 mm (per module)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "10,500hz",
        PRODUCT_NAME: "IPE060",
        SEQ: 1139,
        BRIGHTNESS: "1,400 nit"
        },
        {
        DIMENSIONS: "264x297 mm (per module)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "10,500hz",
        PRODUCT_NAME: "IPE040",
        SEQ: 1137,
        BRIGHTNESS: "1,800 nit"
        },
        {
        DIMENSIONS: "203x229 mm (per module)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "10,500hz",
        PRODUCT_NAME: "IPE030",
        SEQ: 1136,
        BRIGHTNESS: "2,000 nit"
        },
        {
        DIMENSIONS: "480x540x65 mm (per cabinet)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "1,920Hz, 3,840 Hz Selectable",
        PRODUCT_NAME: "IF025H",
        SEQ: 1094,
        BRIGHTNESS: "2,400 nit / 1,200 nit"
        },
        {
        DIMENSIONS: "480x540x65 mm (per cabinet)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "1,920Hz, 3,840 Hz Selectable",
        PRODUCT_NAME: "IF020H",
        SEQ: 1093,
        BRIGHTNESS: "2,400 nit / 1,200 nit"
        },
        {
        DIMENSIONS: "480x540x65 mm (per cabinet)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "1,920Hz, 3,840 Hz Selectable",
        PRODUCT_NAME: "IF015H",
        SEQ: 1092,
        BRIGHTNESS: "1,600 nit / 800 nit"
        },
        {
        DIMENSIONS: "264x264 mm (per module)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "49,920hz",
        PRODUCT_NAME: "IPS160",
        SEQ: 813,
        BRIGHTNESS: "2,000 nit"
        },
        {
        DIMENSIONS: "203x203 mm (per module)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "49,920hz",
        PRODUCT_NAME: "IPS120",
        SEQ: 812,
        BRIGHTNESS: "2,000 nit"
        },
        {
        DIMENSIONS: "330x165 mm (per module)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "49,920hz",
        PRODUCT_NAME: "IPS100",
        SEQ: 811,
        BRIGHTNESS: "2,000 nit"
        },
        {
        DIMENSIONS: "264x297 mm (per module)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "49,920hz",
        PRODUCT_NAME: "IPS080",
        SEQ: 810,
        BRIGHTNESS: "2,000 nit"
        },
        {
        DIMENSIONS: "203x229 mm (per module)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "10,500hz",
        PRODUCT_NAME: "IPS060",
        SEQ: 809,
        BRIGHTNESS: "2,000 nit"
        },
        {
        DIMENSIONS: "264x297 mm (per module)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "10,500hz",
        PRODUCT_NAME: "IPS040",
        SEQ: 808,
        BRIGHTNESS: "2,000 nit"
        },
        {
        DIMENSIONS: "203x229 mm (per module)",
        CATEGORY: "Indoor",
        REFRESH_RATE: "10,500hz",
        PRODUCT_NAME: "IPS030",
        SEQ: 807,
        BRIGHTNESS: "2,000 nit"
        }
    ]
};
var thewall = {
    list: [
        {
        DIMENSIONS: "806.4x453.6x72.5 mm",
        CATEGORY: "The Wall",
        REFRESH_RATE: "3,840 Hz",
        PRODUCT_NAME: "IW008J",
        SEQ: 1346,
        BRIGHTNESS: "1,600 nit / 500 nit"
        }
    ]
};