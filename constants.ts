import { ProductDetails, Review, RelatedProduct } from './types';

export const WHATSAPP_NUMBER = "919226740297";
export const INSTAGRAM_HANDLE = "thetidbit.in";
export const LOGO_URL = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765969614/canva-_logo-_bykbip.png";
export const ARTISAN_STORY_IMAGE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765956721/Dec_17_2025_01_01_22_PM_sdkox1.png";
export const ARTISAN_SPOTLIGHT_IMAGE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765957946/ChatGPT_Image_Dec_17_2025_01_22_13_PM_ymwkfv.png";
export const MISSION_IMAGE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765963603/generated-image_stxalr.jpg";
export const AMAZON_PRODUCT_URL = "https://www.amazon.in/dp/B0DWGWX248?th=1";
export const AMAZON_STORE_URL = "https://www.amazon.in/stores/VisitTHETIDBIT/page/13388266-8AB4-473E-8B9B-58BB90AC3114?lp_asin=B0DY2M7HHZ&ref_=ast_bln";

// Social Links
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/thetidbit.in/",
  facebook: "https://www.facebook.com/thetidbitin",
  youtube: "https://www.youtube.com/@Thetidbit.",
};

// Marketplace Links
export const MARKETPLACE_LINKS = {
  amazon: "https://www.amazon.in/s?me=AOVT3FSY2UEZO&marketplaceID=A21TJRUUN4KGV",
  flipkart: "https://www.flipkart.com/thetidbit-red-sling-bag-red-rounded-sling/p/itm4b96b43ad5583",
  meesho: "https://www.meesho.com/1svk8?ms=2",
};

// Contact Information
export const CONTACT_INFO = {
  mobile: "9226740297",
  whatsapp: "9226740297",
  email: "support@thetidbit.in",
  address: "SN 406, Shivsahkti, Ambernath, Thane, Mumbai 421505",
};

// Hero Banner Images
export const HERO_BANNERS = [
  "https://res.cloudinary.com/thetidbit23024/image/upload/v1768458165/2_txnnxs.png",
  "https://res.cloudinary.com/thetidbit23024/image/upload/v1768457143/hero-b2_tvvngl.png",
  "https://res.cloudinary.com/thetidbit23024/image/upload/v1768458400/hero-b-3_wf0iao.png",
  "https://res.cloudinary.com/thetidbit23024/image/upload/v1768422516/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/3_oykj9w.png",
];

// Product Categories
export const PRODUCT_CATEGORIES = [
  { id: "sling-bag", name: "Sling Bag", slug: "sling-bag" },
  { id: "sling-bag-rounded", name: "Sling Bag Rounded", slug: "sling-bag-rounded" },
  { id: "handbag", name: "Handbag", slug: "handbag" },
] as const;

// Category Images for Shop by Category Section
export const CATEGORY_IMAGES: Record<string, string> = {
  "sling-bag": "https://res.cloudinary.com/thetidbit23024/image/upload/v1768472630/cata_xjhfve.png",
  "sling-bag-rounded": "https://res.cloudinary.com/thetidbit23024/image/upload/v1768472631/category-rounded-sling_fh4hyy.png",
  "handbag": "https://res.cloudinary.com/thetidbit23024/image/upload/v1768472622/ChatGPT_Image_Jan_15_2026_03_52_50_PM_zzhicn.png",
};

// GOOGLE ANALYTICS ID - Replace this with your actual Measurement ID (starts with G-)
export const GA_TRACKING_ID = "G-6ZVW69DQG4"; 

// Meta Pixel
export const FB_PIXEL_ID = "1924712958256039";

export const VALID_COUPONS = ["SANDY5", "OCEAN5", "NEWYEAR5"];

// Header Badge (right side of navbar)
// Swap this in future for festivals (e.g. "🪔 Diwali", "🎄", "🎉") without changing layout code.
export const HEADER_BADGE: {
  enabled: boolean;
  emoji: string; // emoji (🇮🇳 / 🪔 / 🎉 etc.)
  variant?: 'emoji' | 'svg_india_flag';
  label: string; // short text shown in header
  ariaLabel: string;
  title?: string;
  festive?: {
    enabled: boolean;
    // For seasonal flair (e.g., "snow" for Christmas)
    effect?: 'snow' | 'snowfall' | 'snowfall_banner';
    // Optional height for banner-style snowfall (pixels)
    bannerHeightPx?: number;
  };
} = {
  enabled: true,
  emoji: "🇮🇳",
  variant: 'svg_india_flag',
  label: "",
  ariaLabel: "India",
  title: "India",
  festive: {
    enabled: true,
    effect: 'snowfall_banner',
    bannerHeightPx: 260,
  },
};

/*
  GEMINI IMAGE GENERATION PROMPTS
  -------------------------------
  Use these prompts to generate the specific assets for this website.
  
  1. HERO IMAGE 
     Resolution: 4k (3840x2160) or 1920x1080
     Aspect Ratio: 16:9
     Prompt: "Generate a photorealistic lifestyle image based on this uploaded bag. Show a stylish young Indian woman (age 20-25) wearing this jute sling bag across her body. She is walking through a sunlit vibrant street market in Jaipur or a lush garden cafe. She is wearing a white cotton kurti with jeans or a boho floral maxi dress. The lighting should be golden hour, warm, and natural. Focus on the bag and her happy, candid expression. Authentic fashion photography, high resolution 4k."

  2. PRODUCT STUDIO SHOT
     Resolution: 2048x2048
     Aspect Ratio: 1:1
     Prompt: "Create a high-end product photography shot of this jute bag. Place the bag upright on a natural beige stone podium or a rustic wooden table. Surround it with subtle props like dried pampas grass, a small clay vase, or raw jute twine to emphasize the eco-friendly theme. The background should be a soft, neutral beige or off-white wall with dappled sunlight shadows (gobo effect). Resolution 2048x2048, sharp focus on embroidery texture."

  3. ARTISAN STORY (Process)
     Resolution: 4k (3840x2160)
     Aspect Ratio: 4:3 or 16:9
     Prompt: "Cinematic close-up shot focusing on the details of this jute bag. Show the hands of an artisan (older Indian woman) holding the bag or adding a final embroidery stitch. The lighting should be warm and moody, resembling a workshop environment. Deeply textured, focus on the rough jute texture and the colorful threads. High Resolution 4k."

  4. SOCIAL MEDIA FLAT LAY
     Resolution: 1080x1920
     Aspect Ratio: 9:16
     Prompt: "Aesthetic flat lay photography of this jute bag placed on a textured white linen sheet. Arrange everyday essentials next to it spilling out slightly: a pair of sunglasses, a small notebook, a lip balm, and an iced coffee. Soft, diffused morning light. Minimalist, boho-chic style. Resolution 1080x1920."

  5. ARTISAN SPOTLIGHT (Lakshmi Devi)
     Resolution: 1536x2048
     Aspect Ratio: 3:4
     Prompt: "A cinematic portrait of Lakshmi Devi, a 60-year-old master artisan weaver from rural West Bengal, India. She has a warm, dignified smile and wise eyes, wearing a traditional beige and red cotton saree. She is sitting in a sunlit rustic workshop, holding a handcrafted jute bag with embroidery in her lap. Her hands look weathered and skilled. The background is slightly blurred, showing wooden looms and colorful spools of thread. Warm natural lighting, high dynamic range, photorealistic, 4k."

  6. MISSION SECTION (About Us)
     Resolution: 1920x1440
     Aspect Ratio: 4:3
     Prompt: "A cinematic, high-resolution shot symbolizing the bridge between traditional craftsmanship and modern sustainable fashion. In the foreground, a beautifully handcrafted round jute bag with colorful embroidery sits on a rustic wooden table. Next to it are raw golden jute fibers, a vintage wooden loom shuttle, and a small potted green plant, emphasizing eco-friendliness. Soft, golden-hour sunlight streams from a nearby window, illuminating the coarse texture of the jute and creating warm, inviting shadows. The background is a blurred, modern, airy minimalist living space. Photorealistic, 8k, highly detailed texture, warm earth tones."

  7. LOGO (TheTidbit)
     Resolution: 1024x1024
     Aspect Ratio: 1:1
     Prompt: "A modern, minimalist logo design for a sustainable fashion brand called 'TheTidbit'. The typography should be an elegant, bold serif font in deep forest green. Integrated with the text, include a subtle, artistic line-art icon of a jute leaf or a woven thread knot to symbolize handmade craftsmanship. The aesthetic should be organic, earthy, and premium. Vector style, flat design, white background, high quality."
*/

// Model Shots (Lifestyle)
const MODEL_RED = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765954770/ChatGPT_Image_Dec_17_2025_12_27_11_PM_afaonp.png";
const MODEL_BLUE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765955249/ChatGPT_Image_Dec_17_2025_12_37_13_PM_qehis4.png";
const MODEL_ORANGE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765954852/ChatGPT_Image_Dec_17_2025_12_29_52_PM_hvhrpr.png";
const MODEL_PINK = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765953950/ChatGPT_Image_Dec_17_2025_12_11_00_PM_q6o0lb.png";

// Product Shots (Studio)
const PRODUCT_RED = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765955675/ChatGPT_Image_Dec_17_2025_12_42_23_PM_bzyc2j.png";
const PRODUCT_BLUE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765956077/ChatGPT_Image_Dec_17_2025_12_50_33_PM_qwxlgg.png";
const PRODUCT_ORANGE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765956007/ChatGPT_Image_Dec_17_2025_12_49_52_PM_rc26b1.png";
const PRODUCT_PINK = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765956545/Gemini_Generated_Image_ackyldackyldacky_aqxskq.png";

// Flat Lay Shots (Social Media)
const FLATLAY_RED = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765957206/ChatGPT_Image_Dec_17_2025_01_08_48_PM_cy6ief.png";
const FLATLAY_BLUE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765957071/ChatGPT_Image_Dec_17_2025_01_07_39_PM_htm9c5.png";
const FLATLAY_PINK = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765957307/ChatGPT_Image_Dec_17_2025_01_11_31_PM_ctiz6t.png";
const FLATLAY_ORANGE = "https://res.cloudinary.com/thetidbit23024/image/upload/v1765957494/ChatGPT_Image_Dec_17_2025_01_14_23_PM_tka0i4.png";

// Main product for "Sling Bag Rounded" category - 8 colors
export const PRODUCT: ProductDetails = {
  id: "jute-round-sling-001",
  brand: "TheTidbit",
  name: "Handmade Jute Embroidered Round Sling Bag",
  tagline: "Eco-Friendly • Artistic • Boho-Inspired Crossbody Bag",
  price: 499,
  mrp: 1199,
  discountPercentage: 58,
  category: ["Women", "Handbags", "Sling Bag Rounded"],
  material: "Natural Jute with Cotton Lining",
  shape: "Round",
  dimensions: "20 × 20 × 1 cm",
  weight: "310 g",
  origin: "India",
  returnPolicy: "10 Days Return & Exchange",
  delivery: "Free Delivery",
  features: [
    "Handcrafted jute sling bag with intricate embroidery",
    "Eco-friendly and sustainable material",
    "Lightweight yet spacious for daily essentials",
    "Adjustable strap for shoulder or crossbody wear",
    "Unique boho design – every piece is slightly different"
  ],
  colors: [
    { 
      name: "Ruby Red", 
      hex: "#DC2626", 
      id: "red",
      images: [
        MODEL_RED, 
        PRODUCT_RED,
        FLATLAY_RED
      ]
    },
    { 
      name: "Ocean Blue", 
      hex: "#3B82F6", 
      id: "blue",
      images: [
        MODEL_BLUE, 
        PRODUCT_BLUE,
        FLATLAY_BLUE
      ]
    },
    { 
      name: "Skin Orange", 
      hex: "#FFA07A", 
      id: "skin-orange",
      images: [
        MODEL_ORANGE, 
        PRODUCT_ORANGE,
        FLATLAY_ORANGE
      ]
    },
    { 
      name: "Blush Pink", 
      hex: "#EC4899", 
      id: "pink",
      images: [
        MODEL_PINK, 
        PRODUCT_PINK,
        FLATLAY_PINK
      ]
    },
    { 
      name: "Classic Black", 
      hex: "#000000", 
      id: "black",
      images: [
        MODEL_RED, // Placeholder - update with actual black images
        PRODUCT_RED,
        FLATLAY_RED
      ]
    },
    { 
      name: "Natural Beige", 
      hex: "#D4A574", 
      id: "beige",
      images: [
        MODEL_ORANGE, // Placeholder - update with actual beige images
        PRODUCT_ORANGE,
        FLATLAY_ORANGE
      ]
    },
    { 
      name: "Floral Blue", 
      hex: "#3B82F6", 
      id: "floral-blue",
      images: [
        "https://res.cloudinary.com/thetidbit23024/image/upload/v1750778712/pyv0zxbxcuszdapgf4ey.png",
        "https://res.cloudinary.com/thetidbit23024/image/upload/v1750778712/pyv0zxbxcuszdapgf4ey.png",
        "https://res.cloudinary.com/thetidbit23024/image/upload/v1750778712/pyv0zxbxcuszdapgf4ey.png"
      ]
    },
    { 
      name: "Floral Pink", 
      hex: "#EC4899", 
      id: "floral-pink",
      images: [
        "https://res.cloudinary.com/thetidbit23024/image/upload/v1750778627/b1vtev1ex41w4mmfha0o.png",
        "https://res.cloudinary.com/thetidbit23024/image/upload/v1750778627/b1vtev1ex41w4mmfha0o.png",
        "https://res.cloudinary.com/thetidbit23024/image/upload/v1750778627/b1vtev1ex41w4mmfha0o.png"
      ]
    },
  ]
};

// First product for "Sling Bag" category - 15 colors
export const SLING_BAG_PRODUCT_1: ProductDetails = {
  id: "jute-sling-bag-001",
  brand: "TheTidbit",
  name: "Handmade Jute Classic Sling Bag",
  tagline: "Eco-Friendly • Handmade • Classic Crossbody Bag",
  price: 599,
  mrp: 1199,
  discountPercentage: 50,
  category: ["Women", "Handbags", "Sling Bag"],
  material: "Natural Jute with Cotton Lining",
  shape: "Rectangular",
  dimensions: "22 × 18 × 2 cm",
  weight: "320 g",
  origin: "India",
  returnPolicy: "10 Days Return & Exchange",
  delivery: "Free Delivery",
  features: [
    "Handcrafted by skilled artisans",
    "100% eco-friendly and sustainable",
    "Lightweight and easy to carry",
    "Adjustable strap for comfortable wear",
    "Spacious interior with secure zip closure"
  ],
  colors: [
    { name: "Mikey Pink", hex: "#EC4899", id: "mikey-pink", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462272/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/26_g1xnvi.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462264/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/25_zduqvi.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462276/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/27_dpkahd.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462275/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/28_qcoovb.png"
    ]},
    { name: "Mikey Purple", hex: "#9333EA", id: "mikey-purple", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462296/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/33_zbn3eq.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462291/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/32_rnyf3e.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462298/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/34_z9ivsn.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462296/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/33_zbn3eq.png"
    ]},
    { name: "Floral Pink", hex: "#EC4899", id: "floral-pink", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1750778627/b1vtev1ex41w4mmfha0o.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1750778627/b1vtev1ex41w4mmfha0o.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1750778627/b1vtev1ex41w4mmfha0o.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1750778627/b1vtev1ex41w4mmfha0o.png"
    ]},
    { name: "Black Wave", hex: "#000000", id: "black-wave", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768461969/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/85_az8kpf.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462377/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/86_nujzuo.png"
    ]},
    { name: "Blue Wave", hex: "#3B82F6", id: "blue-wave", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466367/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/87_qs5ruc.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466380/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/88_fc1jmw.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466378/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/89_gscvjx.png"
    ]},
    { name: "Yellow Mate", hex: "#FBBF24", id: "yellow-mate", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466638/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_guluev.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466638/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2_vo9hj6.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466649/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/3_kdxlcp.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466638/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/6_vsir1o.png"
    ]},
    { name: "Pink Mate", hex: "#EC4899", id: "pink-mate", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466703/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/33_vv0bth.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466697/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/22_bdyjy4.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466702/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/11_tbq9tp.png"
    ]},
    { name: "Blue Mate", hex: "#3B82F6", id: "blue-mate", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466752/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_xb7vdk.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466752/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/22_a66uzc.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466761/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/33_sx3d1j.png"
    ]},
    { name: "Grey Mate", hex: "#6B7280", id: "grey-mate", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462085/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/166_qyvwoi.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462089/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/167_asp7qq.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462093/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/168_uugvvd.png"
    ]},
    { name: "Check Black", hex: "#000000", id: "check-black", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462224/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/15_lfocxb.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462228/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/16_ipbtmo.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462232/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/17_znfsj3.png"
    ]},
    { name: "Buckle Pink", hex: "#EC4899", id: "buckle-pink", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768461991/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/106_indprr.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462006/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/107_jyeujz.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462002/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/109_iyk0ok.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768461998/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/108_yqtkdx.png"
    ]},
    { name: "Buckle Blue", hex: "#3B82F6", id: "buckle-blue", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768467802/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/130_gm05fp.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768467803/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/131_gx0kcb.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768467800/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/132_opnoxg.png"
    ]},
    { name: "Check Purple", hex: "#9333EA", id: "check-purple", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768467405/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_p9akal.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768467408/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/3_mzoboz.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768467395/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/6_ckzkdx.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768467412/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/5_ttjpg4.png"
    ]},
    { name: "Half Round Pink", hex: "#EC4899", id: "half-round-pink", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468566/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/4_qlielk.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468566/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_afyn9y.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468567/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2_rlvzoz.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468566/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/3_qtxsxm.png"
    ]},
    { name: "Half Round Blue", hex: "#3B82F6", id: "half-round-blue", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468607/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_ng5isc.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468608/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/ChatGPT_Image_Jan_1_2026_12_03_05_AM_hbcgnm.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468607/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2_cxxywz.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468609/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/3_gvozcu.png"
    ]},
  ]
};

// Second product for "Sling Bag" category - 5 colors
export const SLING_BAG_PRODUCT_2: ProductDetails = {
  id: "jute-sling-bag-002",
  brand: "TheTidbit",
  name: "Handmade Jute Woven Sling Bag",
  tagline: "Eco-Friendly • Handmade • Woven Design Crossbody Bag",
  price: 649,
  mrp: 1299,
  discountPercentage: 50,
  category: ["Women", "Handbags", "Sling Bag"],
  material: "Natural Jute with Cotton Lining",
  shape: "Rectangular",
  dimensions: "23 × 19 × 2 cm",
  weight: "330 g",
  origin: "India",
  returnPolicy: "10 Days Return & Exchange",
  delivery: "Free Delivery",
  features: [
    "Handcrafted by skilled artisans",
    "100% eco-friendly and sustainable",
    "Lightweight and easy to carry",
    "Adjustable strap for comfortable wear",
    "Beautiful woven pattern design",
    "Spacious interior with secure zip closure"
  ],
  colors: [
    { name: "Butterfly Blue", hex: "#3B82F6", id: "butterfly-blue", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464291/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2-blue5_u9yi6b.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464283/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2-blue6_xjbgcj.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464285/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2-blue1_mhofcq.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464298/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2-blue2_or86al.png"
    ]},
    { name: "Butterfly Pink", hex: "#EC4899", id: "butterfly-pink", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464270/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_sagpcp.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464255/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/5_py463l.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464266/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2_txp3et.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464250/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/6_zxad7k.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464262/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/3_isdhjb.png"
    ]},
    { name: "Butterfly Red", hex: "#DC2626", id: "butterfly-red", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464228/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2-red5_fz9hl5.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464241/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2-red1_svogzh.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464238/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2-red2_uanvne.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464240/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2-red3_kcs5me.png"
    ]},
    { name: "Star Blue", hex: "#3B82F6", id: "star-blue", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462255/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/22_gydchv.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462256/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/23_lnfo8y.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462260/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/24_gbyeli.png"
    ]},
    { name: "Star Pink", hex: "#EC4899", id: "star-pink", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468993/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/18_pwngpl.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468991/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/21_sz6cud.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468991/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/20_zg4apj.png"
    ]},
  ]
};

// Main product for "Handbag" category - 20 colors
export const HANDBAG_PRODUCT: ProductDetails = {
  id: "jute-handbag-001",
  brand: "TheTidbit",
  name: "Handmade Jute Handbag with Fringe Design",
  tagline: "Eco-Friendly • Handmade • Stylish Shoulder Bag",
  price: 799,
  mrp: 1299,
  discountPercentage: 38,
  category: ["Women", "Handbags", "Handbag"],
  material: "Natural Jute with Cotton Lining",
  shape: "Rectangular",
  dimensions: "25 × 20 × 3 cm",
  weight: "350 g",
  origin: "India",
  returnPolicy: "10 Days Return & Exchange",
  delivery: "Free Delivery",
  features: [
    "Handcrafted by skilled artisans",
    "100% eco-friendly and sustainable",
    "Lightweight and easy to carry",
    "Secure zipper closure",
    "Spacious interior for daily essentials",
    "Beautiful fringe design detail"
  ],
  colors: [
    { name: "Black Check", hex: "#000000", id: "black-check", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466459/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2_nmswop.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466459/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_qgh08y.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466459/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/3_bgmq1w.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768461911/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/60_gxcxwa.png"
    ]},
    { name: "Blue Check", hex: "#3B82F6", id: "blue-check", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466546/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2_h20gos.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466547/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_m73zhx.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466547/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/3_t1vsqj.png"
    ]},
    { name: "Yellow Black", hex: "#FBBF24", id: "yellow-black", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768465954/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2_b9ki6b.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768465953/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/3_p52ati.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768465954/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_o9j1dr.png"
    ]},
    { name: "White Blue", hex: "#0EA5E9", id: "white-blue", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466003/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_laabic.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466003/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/3_rpjnbj.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466003/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2_pkpxk6.png"
    ]},
    { name: "Miniun Yellow", hex: "#FBBF24", id: "miniun-yellow", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466153/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_dnmaah.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466165/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/3_bott1a.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466150/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2_lnuprm.png"
    ]},
    { name: "Lions Grey", hex: "#6B7280", id: "lions-grey", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464081/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/36_zqdn3j.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464085/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/37_ckobxw.png"
    ]},
    { name: "Furr Purple", hex: "#9333EA", id: "furr-purple", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464031/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/184_rcw2go.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464037/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/185_e00bi9.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464039/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/186_ijmc7b.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464058/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/187_joqwhi.png"
    ]},
    { name: "Furr Pink", hex: "#EC4899", id: "furr-pink", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464048/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/188_w7fuvx.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464057/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/190_w2ofqd.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464095/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/189_zzybpa.png"
    ]},
    { name: "Button Black", hex: "#000000", id: "button-black", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466921/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_brigbq.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466932/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2_aetggw.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466935/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/3_cgiz7m.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462106/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/171_wconjq.png"
    ]},
    { name: "Button Purple", hex: "#9333EA", id: "button-purple", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466991/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_laonca.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466993/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2_zdkevk.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768466997/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/3_eogtuq.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462119/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/175_pw6l2x.png"
    ]},
    { name: "Rambo Yellow", hex: "#FBBF24", id: "rambo-yellow", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768461862/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/41_xycmsn.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768461870/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/44_gmcu8r.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768461868/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/43_qipeqb.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768461864/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/42_gjgmgn.png"
    ]},
    { name: "Rambo Purple", hex: "#9333EA", id: "rambo-purple", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464088/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/38_l0bpd9.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464100/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/40_rn5hr4.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768464091/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/39_ugdioj.png"
    ]},
    { name: "Grey White", hex: "#6B7280", id: "grey-white", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462144/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/197_y2o3og.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462147/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/198_d7me8d.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462152/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/199_xpvsoh.png"
    ]},
    { name: "Purple White", hex: "#9333EA", id: "purple-white", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462132/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/193_chtv9a.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462139/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/195_zfj8az.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462129/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/192_ox4jhw.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768462135/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/194_zdd11l.png"
    ]},
    { name: "White Pink Line", hex: "#EC4899", id: "white-pink-line", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768461885/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/48_ed8wh6.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768461889/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/49_xxm7zz.png"
    ]},
    { name: "White Blue Line", hex: "#0EA5E9", id: "white-blue-line", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768461893/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/50_prwztp.png"
    ]},
    { name: "Evil Eye Blue", hex: "#3B82F6", id: "evil-eye-blue", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768467996/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_cohere.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768467979/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/3_nydfcf.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768467985/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/6_hflw6j.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768467979/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/5_e99nmt.png"
    ]},
    { name: "Evil Eye Pink", hex: "#EC4899", id: "evil-eye-pink", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468409/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_k9kvjg.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468411/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2_b42qtn.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468409/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/5_nzu8si.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468410/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/6_l5szdg.png"
    ]},
    { name: "Buckle Yellow", hex: "#FBBF24", id: "buckle-yellow", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468729/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_tuvmng.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468730/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2_ffwfrb.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468729/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/3_sr5t1h.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468728/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/4_dfkb9d.png"
    ]},
    { name: "Bicle White", hex: "#FFFFFF", id: "bicle-white", images: [
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468796/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/1_wpotiu.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468796/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/2_vrrbmg.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768468808/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/3_xrtmcs.png",
      "https://res.cloudinary.com/thetidbit23024/image/upload/v1768463962/Thetidbit%20Venture%20-%20all%20assets%20%28thetidbit.in%29/all-products/159_frs2qp.png"
    ]},
  ]
};

// Category to Main Product mapping (uses first product for categories with multiple products)
export const CATEGORY_PRODUCTS: Record<string, ProductDetails> = {
  "sling-bag-rounded": PRODUCT,
  "sling-bag": SLING_BAG_PRODUCT_1, // First product (15 colors)
  "handbag": HANDBAG_PRODUCT,
};

// Helper function to get main product by category slug
export const getProductByCategory = (categorySlug: string): ProductDetails => {
  return CATEGORY_PRODUCTS[categorySlug] || PRODUCT;
};

// All Products Array - All products for each category
export const ALL_PRODUCTS: ProductDetails[] = [
  // Sling Bag Rounded - 1 product with 8 colors
  PRODUCT,
  // Sling Bag - 2 products (15 colors + 5 colors)
  SLING_BAG_PRODUCT_1,  // 15 colors
  SLING_BAG_PRODUCT_2,  // 5 colors
  // Handbag - 1 product with 20 colors
  HANDBAG_PRODUCT,
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    author: "Ananya S.",
    rating: 5,
    text: "Absolutely in love with this bag! The embroidery is so detailed and it fits my phone, wallet, and keys perfectly. Feels great to use something eco-friendly.",
    date: "2 days ago"
  },
  {
    id: 2,
    author: "Priya M.",
    rating: 5,
    text: "Ordered the Pink one for college. It's super cute and lightweight. Got so many compliments already!",
    date: "1 week ago"
  },
  {
    id: 3,
    author: "Riya K.",
    rating: 4,
    text: "Good quality jute. The strap length is perfect. Delivery was super fast.",
    date: "2 weeks ago"
  }
];

export const NEW_ARRIVALS: RelatedProduct[] = [
  {
    id: "boho-tote-002",
    name: "Classic Jute Shopper Tote",
    price: 499,
    mrp: 1499,
    image: "https://picsum.photos/seed/tote1/400/500",
    tag: "Bestseller"
  },
  {
    id: "clutch-003",
    name: "Embroidered Evening Clutch",
    price: 499,
    mrp: 899,
    image: "https://picsum.photos/seed/clutch1/400/500",
    tag: "New"
  },
  {
    id: "sling-sq-004",
    name: "Square Patchwork Sling",
    price: 499,
    mrp: 1299,
    image: "https://picsum.photos/seed/sling2/400/500",
    tag: "Limited Ed."
  },
  {
    id: "pouch-005",
    name: "Eco Mini Coin Pouch",
    price: 499,
    mrp: 299,
    image: "https://picsum.photos/seed/pouch1/400/500"
  }
];