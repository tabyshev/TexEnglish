// =============================================
// TECHNICAL ENGLISH - PC BUILD SIMULATOR
// =============================================

// Game Configuration
const CONFIG = {
    TOTAL_COMPONENTS: 7,
    INITIAL_TIME: 60,
    TIME_PENALTY: 5,
    TIME_REWARD: 3,
    COMBO_MULTIPLIER: [1, 1.2, 1.5, 2, 2.5, 3],
    QUESTIONS_PER_LEVEL: 50,
    DIFFICULTY_POINTS: { easy: 10, medium: 20, hard: 30 }
};

// Game State
const gameState = {
    active: false,
    timeLeft: CONFIG.INITIAL_TIME,
    timerInterval: null,
    currentDifficulty: 'easy',
    combo: 0,
    score: 0,
    currentTeam: 1, // 1 or 2
    questionsAnswered: 0,
    gameCompleted: false
};

// Team States
const team1 = {
    score: 0,
    components: 0,
    progress: 0,
    streak: 0,
    currentQuestion: null
};

const team2 = {
    score: 0,
    components: 0,
    progress: 0,
    streak: 0,
    currentQuestion: null
};

// All Questions Database (150+ Technical English questions)
const QUESTIONS = {
    easy: [
        {
            id: 1,
            question: "What does 'CPU' stand for in computer terminology?",
            options: [
                "Central Processing Unit",
                "Computer Processing Unit", 
                "Central Program Unit",
                "Computer Program Utility"
            ],
            correct: 0,
            category: "Terminology"
        },
        {
            id: 2,
            question: "Which component stores temporary data for quick access by the CPU?",
            options: [
                "Hard Drive",
                "RAM",
                "GPU",
                "PSU"
            ],
            correct: 1,
            category: "Hardware"
        },
        {
            id: 3,
            question: "What is the purpose of a GPU in a computer system?",
            options: [
                "Power supply management",
                "Graphics rendering and processing",
                "Data storage",
                "Network connectivity"
            ],
            correct: 1,
            category: "Hardware"
        },
        {
            id: 4,
            question: "Which of these is an operating system?",
            options: [
                "Microsoft Word",
                "Windows 10",
                "Adobe Photoshop",
                "Google Chrome"
            ],
            correct: 1,
            category: "Software"
        },
        {
            id: 5,
            question: "What does 'SSD' stand for?",
            options: [
                "Solid State Drive",
                "Super Speed Disk",
                "System Storage Device",
                "Secondary Storage Drive"
            ],
            correct: 0,
            category: "Storage"
        },
        {
            id: 6,
            question: "Which port is typically used for connecting monitors?",
            options: [
                "USB",
                "HDMI",
                "Ethernet",
                "Audio jack"
            ],
            correct: 1,
            category: "Connections"
        },
        {
            id: 7,
            question: "What is 'BIOS' in a computer system?",
            options: [
                "Basic Input/Output System",
                "Binary Input/Output Software",
                "Basic Internet Operating System",
                "Binary Internet Output Service"
            ],
            correct: 0,
            category: "System"
        },
        {
            id: 8,
            question: "Which component provides power to all parts of the computer?",
            options: [
                "Motherboard",
                "CPU",
                "PSU",
                "RAM"
            ],
            correct: 2,
            category: "Power"
        },
        {
            id: 9,
            question: "What does 'LAN' stand for?",
            options: [
                "Local Area Network",
                "Large Access Network",
                "Linked Area Nodes",
                "Local Access Node"
            ],
            correct: 0,
            category: "Networking"
        },
        {
            id: 10,
            question: "Which of these is a programming language?",
            options: [
                "HTML",
                "CSS",
                "Python",
                "HTTP"
            ],
            correct: 2,
            category: "Programming"
        },
        {
            id: 11,
            question: "What is the main function of a motherboard?",
            options: [
                "Store data permanently",
                "Connect all components together",
                "Process graphics",
                "Provide internet connection"
            ],
            correct: 1,
            category: "Hardware"
        },
        {
            id: 12,
            question: "Which device converts AC power to DC for computer components?",
            options: [
                "CPU",
                "GPU",
                "PSU",
                "RAM"
            ],
            correct: 2,
            category: "Power"
        },
        {
            id: 13,
            question: "What does 'HTTP' stand for?",
            options: [
                "HyperText Transfer Protocol",
                "High Transfer Text Protocol",
                "Hyper Transfer Text Process",
                "High Text Transfer Process"
            ],
            correct: 0,
            category: "Networking"
        },
        {
            id: 14,
            question: "Which component is responsible for cooling the CPU?",
            options: [
                "Heat sink or fan",
                "GPU cooler",
                "Case fan",
                "RAM heat spreader"
            ],
            correct: 0,
            category: "Cooling"
        },
        {
            id: 15,
            question: "What is 'USB' short for?",
            options: [
                "Universal Serial Bus",
                "United System Bus",
                "Universal System Bridge",
                "United Serial Bridge"
            ],
            correct: 0,
            category: "Connections"
        },
        {
            id: 16,
            question: "Which of these is a type of computer memory?",
            options: [
                "NVIDIA",
                "DDR4",
                "SATA",
                "PCIe"
            ],
            correct: 1,
            category: "Memory"
        },
        {
            id: 17,
            question: "What does 'IP' stand for in networking?",
            options: [
                "Internet Protocol",
                "Internal Processing",
                "Internet Port",
                "Internal Protocol"
            ],
            correct: 0,
            category: "Networking"
        },
        {
            id: 18,
            question: "Which component would you upgrade for better gaming performance?",
            options: [
                "RAM",
                "GPU",
                "SSD",
                "All of the above"
            ],
            correct: 3,
            category: "Gaming"
        },
        {
            id: 19,
            question: "What is 'Wi-Fi' technology used for?",
            options: [
                "Wireless networking",
                "Wired internet connection",
                "Graphics processing",
                "Power supply"
            ],
            correct: 0,
            category: "Wireless"
        },
        {
            id: 20,
            question: "Which file format is typically used for images?",
            options: [
                "MP3",
                "PDF",
                "JPEG",
                "EXE"
            ],
            correct: 2,
            category: "File Formats"
        },
        {
            id: 21,
            question: "What does 'OS' stand for in computing?",
            options: [
                "Operating System",
                "Output Signal",
                "Optical Storage",
                "Online Service"
            ],
            correct: 0,
            category: "System"
        },
        {
            id: 22,
            question: "Which connector is used for Ethernet cables?",
            options: [
                "USB-C",
                "RJ45",
                "HDMI",
                "VGA"
            ],
            correct: 1,
            category: "Connections"
        },
        {
            id: 23,
            question: "What is the purpose of an anti-virus program?",
            options: [
                "Speed up computer",
                "Protect against malware",
                "Manage files",
                "Connect to internet"
            ],
            correct: 1,
            category: "Security"
        },
        {
            id: 24,
            question: "Which storage device has no moving parts?",
            options: [
                "HDD",
                "SSD",
                "DVD",
                "Floppy disk"
            ],
            correct: 1,
            category: "Storage"
        },
        {
            id: 25,
            question: "What does 'PDF' stand for?",
            options: [
                "Portable Document Format",
                "Printed Document File",
                "Personal Data File",
                "Program Data Format"
            ],
            correct: 0,
            category: "File Formats"
        },
        {
            id: 26,
            question: "Which component determines how many programs can run simultaneously?",
            options: [
                "CPU cores",
                "RAM capacity",
                "GPU memory",
                "Storage speed"
            ],
            correct: 1,
            category: "Performance"
        },
        {
            id: 27,
            question: "What is 'Bluetooth' used for?",
            options: [
                "Short-range wireless communication",
                "Long-distance internet",
                "Power transmission",
                "Cooling systems"
            ],
            correct: 0,
            category: "Wireless"
        },
        {
            id: 28,
            question: "Which of these is a web browser?",
            options: [
                "Windows",
                "Chrome",
                "Word",
                "Excel"
            ],
            correct: 1,
            category: "Software"
        },
        {
            id: 29,
            question: "What does 'RAM' stand for?",
            options: [
                "Random Access Memory",
                "Read Access Memory",
                "Random Active Memory",
                "Read Active Memory"
            ],
            correct: 0,
            category: "Memory"
        },
        {
            id: 30,
            question: "Which component affects boot time the most?",
            options: [
                "CPU",
                "RAM",
                "Storage type (SSD/HDD)",
                "GPU"
            ],
            correct: 2,
            category: "Performance"
        },
        {
            id: 31,
            question: "What is 'HTML' used for?",
            options: [
                "Creating web pages",
                "Programming applications",
                "Database management",
                "Graphics design"
            ],
            correct: 0,
            category: "Web"
        },
        {
            id: 32,
            question: "Which port is commonly used for charging smartphones?",
            options: [
                "USB",
                "HDMI",
                "VGA",
                "Ethernet"
            ],
            correct: 0,
            category: "Connections"
        },
        {
            id: 33,
            question: "What does 'VPN' stand for?",
            options: [
                "Virtual Private Network",
                "Very Private Network",
                "Virtual Public Network",
                "Verified Private Network"
            ],
            correct: 0,
            category: "Security"
        },
        {
            id: 34,
            question: "Which component affects gaming resolution and frame rate?",
            options: [
                "CPU",
                "GPU",
                "RAM",
                "PSU"
            ],
            correct: 1,
            category: "Gaming"
        },
        {
            id: 35,
            question: "What is 'cloud storage'?",
            options: [
                "Storage on local hard drive",
                "Storage on remote servers",
                "RAM storage",
                "GPU memory"
            ],
            correct: 1,
            category: "Storage"
        },
        {
            id: 36,
            question: "Which tool is used to build a PC?",
            options: [
                "Screwdriver",
                "Hammer",
                "Wrench",
                "Pliers"
            ],
            correct: 0,
            category: "Tools"
        },
        {
            id: 37,
            question: "What does 'LCD' stand for?",
            options: [
                "Liquid Crystal Display",
                "Light Crystal Display",
                "Liquid Color Display",
                "Light Color Display"
            ],
            correct: 0,
            category: "Display"
        },
        {
            id: 38,
            question: "Which of these is a peripheral device?",
            options: [
                "CPU",
                "Motherboard",
                "Keyboard",
                "RAM"
            ],
            correct: 2,
            category: "Peripherals"
        },
        {
            id: 39,
            question: "What is 'thermal paste' used for?",
            options: [
                "Improve CPU cooling",
                "Connect RAM modules",
                "Secure GPU",
                "Clean motherboard"
            ],
            correct: 0,
            category: "Cooling"
        },
        {
            id: 40,
            question: "Which of these is a programming term?",
            options: [
                "Loop",
                "Motherboard",
                "Router",
                "Browser"
            ],
            correct: 0,
            category: "Programming"
        },
        {
            id: 41,
            question: "What does 'GPU' stand for?",
            options: [
                "Graphics Processing Unit",
                "General Processing Unit",
                "Graphics Power Unit",
                "General Power Unit"
            ],
            correct: 0,
            category: "Hardware"
        },
        {
            id: 42,
            question: "Which cable connects the monitor to the computer?",
            options: [
                "USB cable",
                "Power cable",
                "HDMI cable",
                "Ethernet cable"
            ],
            correct: 2,
            category: "Cables"
        },
        {
            id: 43,
            question: "What is 'defragmentation'?",
            options: [
                "Cleaning hardware",
                "Optimizing hard drive",
                "Updating software",
                "Scanning for viruses"
            ],
            correct: 1,
            category: "Maintenance"
        },
        {
            id: 44,
            question: "Which component is often called the 'brain' of the computer?",
            options: [
                "RAM",
                "CPU",
                "Motherboard",
                "GPU"
            ],
            correct: 1,
            category: "Hardware"
        },
        {
            id: 45,
            question: "What does 'LED' stand for?",
            options: [
                "Light Emitting Diode",
                "Low Energy Display",
                "Light Energy Diode",
                "Low Emission Device"
            ],
            correct: 0,
            category: "Components"
        },
        {
            id: 46,
            question: "Which of these is a type of software license?",
            options: [
                "Open source",
                "Hardware",
                "Peripheral",
                "Motherboard"
            ],
            correct: 0,
            category: "Software"
        },
        {
            id: 47,
            question: "What is 'overclocking'?",
            options: [
                "Running hardware faster than specified",
                "Cleaning computer components",
                "Installing new software",
                "Connecting to network"
            ],
            correct: 0,
            category: "Performance"
        },
        {
            id: 48,
            question: "Which component stores the operating system?",
            options: [
                "RAM",
                "CPU",
                "Storage drive",
                "GPU"
            ],
            correct: 2,
            category: "Storage"
        },
        {
            id: 49,
            question: "What does 'SATA' stand for?",
            options: [
                "Serial Advanced Technology Attachment",
                "System Advanced Technology Attachment",
                "Serial Access Technology Attachment",
                "System Access Technology Attachment"
            ],
            correct: 0,
            category: "Connections"
        },
        {
            id: 50,
            question: "Which tool protects against electrostatic discharge?",
            options: [
                "Screwdriver",
                "Anti-static wrist strap",
                "Pliers",
                "Multimeter"
            ],
            correct: 1,
            category: "Tools"
        }
    ],
    
    medium: [
        {
            id: 51,
            question: "What is the purpose of a 'heat sink' in a computer system?",
            options: [
                "To store thermal energy",
                "To dissipate heat from components",
                "To generate heat for components",
                "To measure temperature"
            ],
            correct: 1,
            category: "Cooling"
        },
        {
            id: 52,
            question: "Which protocol is used for secure web browsing (HTTPS)?",
            options: [
                "SSL/TLS",
                "FTP",
                "HTTP",
                "SMTP"
            ],
            correct: 0,
            category: "Security"
        },
        {
            id: 53,
            question: "What does 'RAID' configuration provide for storage?",
            options: [
                "Reduced power consumption",
                "Improved performance or redundancy",
                "Better graphics quality",
                "Faster internet speed"
            ],
            correct: 1,
            category: "Storage"
        },
        {
            id: 54,
            question: "In networking, what is a 'router' used for?",
            options: [
                "Connecting multiple networks",
                "Amplifying Wi-Fi signal",
                "Storing network data",
                "Processing network requests"
            ],
            correct: 0,
            category: "Networking"
        },
        {
            id: 55,
            question: "What is 'virtual memory' in an operating system?",
            options: [
                "RAM installed physically",
                "Hard drive space used as RAM extension",
                "GPU memory allocation",
                "Cloud storage space"
            ],
            correct: 1,
            category: "Memory"
        },
        {
            id: 56,
            question: "Which component interface is commonly used for graphics cards?",
            options: [
                "SATA",
                "PCI Express",
                "USB",
                "HDMI"
            ],
            correct: 1,
            category: "Hardware"
        },
        {
            id: 57,
            question: "What does 'DNS' stand for and what is its function?",
            options: [
                "Domain Name System - translates domain names to IP addresses",
                "Data Network Service - provides internet access",
                "Digital Naming Service - creates domain names",
                "Domain Network System - manages network domains"
            ],
            correct: 0,
            category: "Networking"
        },
        {
            id: 58,
            question: "What is 'thermal throttling' in processors?",
            options: [
                "Increasing speed when hot",
                "Reducing speed to prevent overheating",
                "Cooling system failure",
                "Temperature measurement technique"
            ],
            correct: 1,
            category: "Cooling"
        },
        {
            id: 59,
            question: "Which type of memory is non-volatile and used for firmware?",
            options: [
                "RAM",
                "ROM",
                "Cache",
                "Virtual memory"
            ],
            correct: 1,
            category: "Memory"
        },
        {
            id: 60,
            question: "What is the purpose of a 'CMOS battery' on a motherboard?",
            options: [
                "Power the main components",
                "Store BIOS settings and system clock",
                "Provide backup power during outages",
                "Charge peripheral devices"
            ],
            correct: 1,
            category: "Hardware"
        },
        {
            id: 61,
            question: "In programming, what is a 'compiler'?",
            options: [
                "A tool that translates high-level code to machine code",
                "A program that executes code line by line",
                "A device that compresses files",
                "A system that manages memory"
            ],
            correct: 0,
            category: "Programming"
        },
        {
            id: 62,
            question: "What does 'NVMe' stand for in storage technology?",
            options: [
                "Non-Volatile Memory Express",
                "New Volume Memory Extension",
                "Network Virtual Memory Express",
                "Non-Virtual Memory Extension"
            ],
            correct: 0,
            category: "Storage"
        },
        {
            id: 63,
            question: "Which cooling method uses liquid to transfer heat?",
            options: [
                "Air cooling",
                "Heat sink",
                "Liquid cooling",
                "Thermal paste"
            ],
            correct: 2,
            category: "Cooling"
        },
        {
            id: 64,
            question: "What is 'dual-channel' memory configuration?",
            options: [
                "Using two different RAM brands",
                "Increasing RAM voltage",
                "Using two RAM sticks for better bandwidth",
                "Installing RAM in alternate slots"
            ],
            correct: 2,
            category: "Memory"
        },
        {
            id: 65,
            question: "In networking, what is a 'firewall' used for?",
            options: [
                "Blocking unauthorized network access",
                "Increasing internet speed",
                "Storing network data",
                "Connecting wireless devices"
            ],
            correct: 0,
            category: "Security"
        },
        {
            id: 66,
            question: "What does 'IDE' stand for in computing history?",
            options: [
                "Integrated Development Environment",
                "Intelligent Drive Electronics",
                "Internal Data Exchange",
                "Integrated Data Environment"
            ],
            correct: 1,
            category: "History"
        },
        {
            id: 67,
            question: "Which component determines maximum RAM capacity?",
            options: [
                "CPU",
                "Motherboard",
                "GPU",
                "PSU"
            ],
            correct: 1,
            category: "Hardware"
        },
        {
            id: 68,
            question: "What is 'cache memory' in a CPU?",
            options: [
                "Very fast memory for frequently used data",
                "External storage for backups",
                "Memory for graphics processing",
                "Virtual memory on hard drive"
            ],
            correct: 0,
            category: "Memory"
        },
        {
            id: 69,
            question: "Which protocol is used for email transmission?",
            options: [
                "HTTP",
                "FTP",
                "SMTP",
                "SSH"
            ],
            correct: 2,
            category: "Networking"
        },
        {
            id: 70,
            question: "What is 'GPU rendering' in 3D graphics?",
            options: [
                "Displaying images on screen",
                "Calculating 3D scenes and effects",
                "Storing texture files",
                "Managing display settings"
            ],
            correct: 1,
            category: "Graphics"
        },
        {
            id: 71,
            question: "What does 'API' stand for in software development?",
            options: [
                "Application Programming Interface",
                "Advanced Programming Interface",
                "Application Process Integration",
                "Advanced Process Integration"
            ],
            correct: 0,
            category: "Programming"
        },
        {
            id: 72,
            question: "Which type of monitor has the fastest response time?",
            options: [
                "LCD",
                "LED",
                "OLED",
                "TN panel"
            ],
            correct: 3,
            category: "Display"
        },
        {
            id: 73,
            question: "What is 'firmware' in computing?",
            options: [
                "Software stored permanently on hardware",
                "Temporary software in RAM",
                "Cloud-based applications",
                "Operating system components"
            ],
            correct: 0,
            category: "Software"
        },
        {
            id: 74,
            question: "In storage, what is 'trim' command used for?",
            options: [
                "Formatting drives",
                "SSD garbage collection",
                "Data encryption",
                "Disk defragmentation"
            ],
            correct: 1,
            category: "Storage"
        },
        {
            id: 75,
            question: "What does 'VRM' do on a motherboard?",
            options: [
                "Video rendering management",
                "Voltage regulation for CPU",
                "Virtual memory management",
                "Video RAM management"
            ],
            correct: 1,
            category: "Hardware"
        },
        {
            id: 76,
            question: "Which network device operates at Layer 2 of OSI model?",
            options: [
                "Router",
                "Switch",
                "Hub",
                "Modem"
            ],
            correct: 1,
            category: "Networking"
        },
        {
            id: 77,
            question: "What is 'ECC' memory?",
            options: [
                "Extra Capacity Cache",
                "Error-Correcting Code",
                "Enhanced Clock Cycles",
                "Extended Channel Configuration"
            ],
            correct: 1,
            category: "Memory"
        },
        {
            id: 78,
            question: "In programming, what is 'garbage collection'?",
            options: [
                "Deleting old files",
                "Automatic memory management",
                "Code optimization",
                "Error handling"
            ],
            correct: 1,
            category: "Programming"
        },
        {
            id: 79,
            question: "What does 'M.2' refer to in storage?",
            options: [
                "A form factor for SSDs",
                "Memory type for RAM",
                "Motherboard size",
                "CPU socket type"
            ],
            correct: 0,
            category: "Storage"
        },
        {
            id: 80,
            question: "Which cooling technology uses phase change?",
            options: [
                "Air cooling",
                "Liquid cooling",
                "Heat pipes",
                "Thermal paste"
            ],
            correct: 2,
            category: "Cooling"
        },
        {
            id: 81,
            question: "What is 'latency' in networking?",
            options: [
                "Data transfer speed",
                "Delay in data transmission",
                "Network bandwidth",
                "Connection stability"
            ],
            correct: 1,
            category: "Networking"
        },
        {
            id: 82,
            question: "Which component would you check for POST beep codes?",
            options: [
                "GPU",
                "Motherboard",
                "PSU",
                "CPU"
            ],
            correct: 1,
            category: "Troubleshooting"
        },
        {
            id: 83,
            question: "What does 'UEFI' replace in modern computers?",
            options: [
                "Operating system",
                "BIOS",
                "Device drivers",
                "File system"
            ],
            correct: 1,
            category: "System"
        },
        {
            id: 84,
            question: "In programming, what is an 'IDE'?",
            options: [
                "Internet Development Environment",
                "Integrated Development Environment",
                "Interface Design Editor",
                "Integrated Design Environment"
            ],
            correct: 1,
            category: "Programming"
        },
        {
            id: 85,
            question: "What is 'ray tracing' in graphics?",
            options: [
                "A rendering technique simulating light behavior",
                "A method for increasing FPS",
                "A type of anti-aliasing",
                "A display technology"
            ],
            correct: 0,
            category: "Graphics"
        },
        {
            id: 86,
            question: "Which protocol provides secure remote access?",
            options: [
                "HTTP",
                "FTP",
                "SSH",
                "SMTP"
            ],
            correct: 2,
            category: "Security"
        },
        {
            id: 87,
            question: "What does 'TDP' stand for in processors?",
            options: [
                "Total Design Power",
                "Thermal Design Power",
                "Technical Design Parameter",
                "Thermal Dissipation Performance"
            ],
            correct: 1,
            category: "Hardware"
        },
        {
            id: 88,
            question: "Which file system is used by Windows for system drives?",
            options: [
                "FAT32",
                "exFAT",
                "NTFS",
                "EXT4"
            ],
            correct: 2,
            category: "File Systems"
        },
        {
            id: 89,
            question: "What is 'overclocking' a monitor called?",
            options: [
                "Refresh rate boosting",
                "Resolution scaling",
                "Color calibration",
                "Brightness adjustment"
            ],
            correct: 0,
            category: "Display"
        },
        {
            id: 90,
            question: "In networking, what is 'NAT'?",
            options: [
                "Network Address Translation",
                "Network Access Technology",
                "Node Allocation Table",
                "Network Authentication Tool"
            ],
            correct: 0,
            category: "Networking"
        },
        {
            id: 91,
            question: "What does 'RGB' stand for in lighting?",
            options: [
                "Red, Green, Blue",
                "Random Generated Brightness",
                "Raster Graphics Buffer",
                "Refresh Gamma Balance"
            ],
            correct: 0,
            category: "Components"
        },
        {
            id: 92,
            question: "Which type of backup captures all data at a point in time?",
            options: [
                "Incremental backup",
                "Differential backup",
                "Full backup",
                "Mirror backup"
            ],
            correct: 2,
            category: "Backup"
        },
        {
            id: 93,
            question: "What is 'GPU VRAM' used for?",
            options: [
                "Storing textures and frame buffers",
                "Processing CPU instructions",
                "System memory expansion",
                "Network data caching"
            ],
            correct: 0,
            category: "Graphics"
        },
        {
            id: 94,
            question: "In programming, what is 'OOP'?",
            options: [
                "Object-Oriented Programming",
                "Optimized Operation Process",
                "Output-Oriented Protocol",
                "Organized Operational Programming"
            ],
            correct: 0,
            category: "Programming"
        },
        {
            id: 95,
            question: "What does 'PCIe lane' bandwidth determine?",
            options: [
                "Data transfer speed for connected devices",
                "Power delivery to components",
                "CPU clock speed",
                "RAM capacity"
            ],
            correct: 0,
            category: "Hardware"
        },
        {
            id: 96,
            question: "Which technology allows running multiple OS on one machine?",
            options: [
                "Dual boot",
                "Virtualization",
                "Containerization",
                "All of the above"
            ],
            correct: 3,
            category: "System"
        },
        {
            id: 97,
            question: "What is 'adaptive sync' in displays?",
            options: [
                "Matching refresh rate to GPU output",
                "Automatic brightness adjustment",
                "Color temperature adaptation",
                "Resolution scaling"
            ],
            correct: 0,
            category: "Display"
        },
        {
            id: 98,
            question: "In storage, what is 'wear leveling'?",
            options: [
                "Distributing writes evenly on SSD",
                "Balancing HDD platter usage",
                "Optimizing storage capacity",
                "Reducing power consumption"
            ],
            correct: 0,
            category: "Storage"
        },
        {
            id: 99,
            question: "What does 'IOPS' measure in storage devices?",
            options: [
                "Input/Output Operations Per Second",
                "Internal Operations Processing Speed",
                "Input Output Performance Standard",
                "Integrated Operational Processing System"
            ],
            correct: 0,
            category: "Performance"
        },
        {
            id: 100,
            question: "Which component interface has the highest bandwidth?",
            options: [
                "SATA III",
                "USB 3.2",
                "PCIe 4.0",
                "Thunderbolt 3"
            ],
            correct: 3,
            category: "Connections"
        }
    ],
    
    hard: [
        {
            id: 101,
            question: "What is the difference between 'symmetric' and 'asymmetric' multiprocessing?",
            options: [
                "Symmetric uses identical processors, asymmetric uses different processors",
                "Symmetric is for servers, asymmetric for desktops",
                "Symmetric shares memory, asymmetric has separate memory",
                "Symmetric is faster, asymmetric is more power efficient"
            ],
            correct: 0,
            category: "Architecture"
        },
        {
            id: 102,
            question: "In virtualization, what is 'paravirtualization'?",
            options: [
                "Running multiple virtual machines",
                "Modified OS to work with hypervisor",
                "Virtualizing only specific components",
                "Cloud-based virtualization"
            ],
            correct: 1,
            category: "Virtualization"
        },
        {
            id: 103,
            question: "What does 'TLB' do in CPU memory management?",
            options: [
                "Translation Lookaside Buffer - caches virtual-to-physical address translations",
                "Thread Level Buffer - manages multi-threading",
                "Transfer Load Balancer - distributes memory access",
                "Timing Logic Buffer - synchronizes clock cycles"
            ],
            correct: 0,
            category: "Architecture"
        },
        {
            id: 104,
            question: "Which cache coherence protocol is commonly used in multi-core CPUs?",
            options: [
                "MESI (Modified, Exclusive, Shared, Invalid)",
                "FIFO (First In First Out)",
                "LRU (Least Recently Used)",
                "Random Replacement"
            ],
            correct: 0,
            category: "Architecture"
        },
        {
            id: 105,
            question: "What is 'speculative execution' in modern processors?",
            options: [
                "Executing instructions before knowing if needed",
                "Running code at maximum frequency",
                "Predicting program behavior",
                "Optimizing instruction order"
            ],
            correct: 0,
            category: "Architecture"
        },
        {
            id: 106,
            question: "In networking, what is 'BGP' used for?",
            options: [
                "Border Gateway Protocol - routing between autonomous systems",
                "Bandwidth Guarantee Protocol - QoS management",
                "Binary Gateway Protocol - data transmission",
                "Broadcast Group Protocol - multicast routing"
            ],
            correct: 0,
            category: "Networking"
        },
        {
            id: 107,
            question: "What does 'RAID 5' provide that RAID 1 doesn't?",
            options: [
                "Striping with distributed parity",
                "Mirroring without parity",
                "Better read performance only",
                "Hot swapping capability"
            ],
            correct: 0,
            category: "Storage"
        },
        {
            id: 108,
            question: "What is 'ECC memory' and why is it important for servers?",
            options: [
                "Error Correcting Code memory - detects and corrects data corruption",
                "Enhanced Clock Cycles - increases memory speed",
                "Extended Channel Configuration - improves bandwidth",
                "Efficient Cache Control - optimizes memory access"
            ],
            correct: 0,
            category: "Memory"
        },
        {
            id: 109,
            question: "In GPU architecture, what are 'CUDA cores'?",
            options: [
                "NVIDIA's parallel processing units",
                "AMD's streaming processors",
                "Memory controllers on GPU",
                "Display output units"
            ],
            correct: 0,
            category: "Graphics"
        },
        {
            id: 110,
            question: "What is 'NUMA' architecture in multi-processor systems?",
            options: [
                "Non-Uniform Memory Access - memory access time depends on location",
                "New Unified Memory Architecture - standardized memory design",
                "Networked Unified Memory Access - shared memory over network",
                "Non-User Managed Access - restricted memory access"
            ],
            correct: 0,
            category: "Architecture"
        },
        {
            id: 111,
            question: "What does 'PCIe ASPM' power management do?",
            options: [
                "Active State Power Management - reduces power during idle states",
                "Advanced System Power Management - controls overall system power",
                "Automatic Speed Power Management - adjusts frequency based on load",
                "Active Signal Power Management - optimizes signal strength"
            ],
            correct: 0,
            category: "Power"
        },
        {
            id: 112,
            question: "In storage, what is the 'write amplification' problem in SSDs?",
            options: [
                "Writing more data than requested due to flash memory constraints",
                "Amplifying electrical signals for reliability",
                "Increasing write speed through parallelization",
                "Reducing write endurance over time"
            ],
            correct: 0,
            category: "Storage"
        },
        {
            id: 113,
            question: "What is 'instruction pipelining' in CPU design?",
            options: [
                "Breaking instruction execution into stages for parallel processing",
                "Caching frequently used instructions",
                "Predicting next instructions to execute",
                "Optimizing instruction order for efficiency"
            ],
            correct: 0,
            category: "Architecture"
        },
        {
            id: 114,
            question: "Which memory technology uses 'bank groups' for increased bandwidth?",
            options: [
                "GDDR6 memory",
                "DDR4 memory",
                "LPDDR4 memory",
                "HBM2 memory"
            ],
            correct: 0,
            category: "Memory"
        },
        {
            id: 115,
            question: "What is 'quality of service' in networking?",
            options: [
                "Prioritizing certain types of network traffic",
                "Measuring network speed and reliability",
                "Ensuring network security standards",
                "Managing network device configurations"
            ],
            correct: 0,
            category: "Networking"
        },
        {
            id: 116,
            question: "In cryptography, what is the difference between symmetric and asymmetric encryption?",
            options: [
                "Symmetric uses same key, asymmetric uses public/private keys",
                "Symmetric is faster, asymmetric is more secure",
                "Symmetric for data, asymmetric for authentication",
                "Symmetric is older technology, asymmetric is newer"
            ],
            correct: 0,
            category: "Security"
        },
        {
            id: 117,
            question: "What does 'TDP' actually measure in processors?",
            options: [
                "Maximum heat generated under theoretical load",
                "Actual power consumption during use",
                "Minimum cooling requirement",
                "Thermal capacity of the chip"
            ],
            correct: 0,
            category: "Hardware"
        },
        {
            id: 118,
            question: "What is 'SR-IOV' in virtualization?",
            options: [
                "Single Root I/O Virtualization - sharing PCIe devices with VMs",
                "System Resource I/O Virtualization - allocating resources",
                "Shared Random I/O Virtualization - distributed access",
                "Secure Remote I/O Virtualization - networked devices"
            ],
            correct: 0,
            category: "Virtualization"
        },
        {
            id: 119,
            question: "In display technology, what is 'quantum dot' enhancement?",
            options: [
                "Nanocrystals that improve color accuracy and brightness",
                "Quantum computing for display processing",
                "Dot matrix technology for higher resolution",
                "Quantum tunneling for faster pixel response"
            ],
            correct: 0,
            category: "Display"
        },
        {
            id: 120,
            question: "What is 'register renaming' in out-of-order execution?",
            options: [
                "Mapping architectural registers to physical registers to avoid hazards",
                "Changing register names during compilation",
                "Renaming CPU registers for better organization",
                "Dynamic register allocation at runtime"
            ],
            correct: 0,
            category: "Architecture"
        },
        {
            id: 121,
            question: "What does 'ACPI' provide in power management?",
            options: [
                "Advanced Configuration and Power Interface - OS-directed power management",
                "Automatic CPU Power Interface - dynamic frequency scaling",
                "Advanced Cooling Power Interface - thermal management",
                "Active Component Power Interface - device power control"
            ],
            correct: 0,
            category: "Power"
        },
        {
            id: 122,
            question: "In networking, what is 'multipath TCP'?",
            options: [
                "Using multiple network paths simultaneously for a single connection",
                "Routing through multiple gateways",
                "Load balancing across multiple connections",
                "Failover between network interfaces"
            ],
            correct: 0,
            category: "Networking"
        },
        {
            id: 123,
            question: "What is 'clock gating' in low-power processor design?",
            options: [
                "Turning off clock signals to idle circuit parts",
                "Reducing clock frequency during low load",
                "Gating clock signals for synchronization",
                "Adjusting clock phase for timing"
            ],
            correct: 0,
            category: "Power"
        },
        {
            id: 124,
            question: "What does 'HDR' require in display technology?",
            options: [
                "Higher contrast ratio, wider color gamut, and higher peak brightness",
                "Higher resolution only",
                "Faster refresh rates",
                "Better viewing angles"
            ],
            correct: 0,
            category: "Display"
        },
        {
            id: 125,
            question: "In storage, what is the 'trim' command's limitation with RAID?",
            options: [
                "Most RAID controllers don't pass trim commands to drives",
                "Trim only works with SATA, not NVMe",
                "Trim reduces RAID performance",
                "Trim requires special RAID configuration"
            ],
            correct: 0,
            category: "Storage"
        },
        {
            id: 126,
            question: "What is 'SIMD' in processor instructions?",
            options: [
                "Single Instruction Multiple Data - parallel data processing",
                "Simultaneous Instruction Multi-Threading",
                "System Integrated Memory Directives",
                "Sequential Instruction Memory Data"
            ],
            correct: 0,
            category: "Architecture"
        },
        {
            id: 127,
            question: "What does 'PCIe retimer' do in high-speed signaling?",
            options: [
                "Cleans and boosts signals for longer distances",
                "Retimes clock signals for synchronization",
                "Reduces PCIe latency",
                "Increases PCIe bandwidth"
            ],
            correct: 0,
            category: "Hardware"
        },
        {
            id: 128,
            question: "In cooling, what is 'vapor chamber' technology?",
            options: [
                "Flat heat pipe with larger surface area for heat spreading",
                "Chamber filled with cooling vapor",
                "Vacuum chamber for heat dissipation",
                "Water cooling without pumps"
            ],
            correct: 0,
            category: "Cooling"
        },
        {
            id: 129,
            question: "What is 'memory interleaving' for performance?",
            options: [
                "Distributing memory accesses across banks for parallelism",
                "Mixing different memory types",
                "Interleaving memory slots for stability",
                "Memory error correction technique"
            ],
            correct: 0,
            category: "Memory"
        },
        {
            id: 130,
            question: "What does 'DMA' allow in computer systems?",
            options: [
                "Direct Memory Access - devices access memory without CPU",
                "Dynamic Memory Allocation - runtime memory management",
                "Direct Module Access - hardware component communication",
                "Dedicated Memory Area - reserved memory space"
            ],
            correct: 0,
            category: "Architecture"
        },
        {
            id: 131,
            question: "In networking, what is 'MACsec' used for?",
            options: [
                "MAC layer security encryption",
                "MAC address authentication",
                "MAC filtering for access control",
                "MAC protocol for high-speed networks"
            ],
            correct: 0,
            category: "Security"
        },
        {
            id: 132,
            question: "What is 'PCIe bifurcation' on motherboards?",
            options: [
                "Splitting x16 slot into multiple smaller slots",
                "Dividing PCIe bandwidth between devices",
                "Separating PCIe power delivery",
                "Creating PCIe redundancy"
            ],
            correct: 0,
            category: "Hardware"
        },
        {
            id: 133,
            question: "What does 'MLC vs TLC' refer to in NAND flash?",
            options: [
                "Multi-Level Cell vs Triple-Level Cell - bits per cell",
                "Memory Latency Control vs Timing Latency Control",
                "Multiple Lane Configuration vs Triple Lane Configuration",
                "Main Logic Circuit vs Timing Logic Circuit"
            ],
            correct: 0,
            category: "Storage"
        },
        {
            id: 134,
            question: "In CPU architecture, what is 'micro-op cache'?",
            options: [
                "Caches decoded instructions for reuse",
                "Small cache for micro-operations",
                "Cache for frequently used microcode",
                "Special cache for system operations"
            ],
            correct: 0,
            category: "Architecture"
        },
        {
            id: 135,
            question: "What is 'adaptive voltage scaling' in power management?",
            options: [
                "Dynamically adjusting voltage based on workload",
                "Adapting to different power supplies",
                "Scaling voltage with temperature",
                "Voltage adjustment for overclocking"
            ],
            correct: 0,
            category: "Power"
        },
        {
            id: 136,
            question: "What does 'PLP' provide in enterprise SSDs?",
            options: [
                "Power Loss Protection - capacitors to complete writes during power failure",
                "Performance Level Protection - maintaining speed under load",
                "Protocol Layer Protection - data integrity checks",
                "Physical Layer Protection - hardware redundancy"
            ],
            correct: 0,
            category: "Storage"
        },
        {
            id: 137,
            question: "In display technology, what is 'pixel response time' limitation?",
            options: [
                "Time for pixel to change color, causing ghosting",
                "Delay from input to display",
                "Time to refresh entire screen",
                "Latency in graphics processing"
            ],
            correct: 0,
            category: "Display"
        },
        {
            id: 138,
            question: "What is 'ECC scrubbing' in server memory?",
            options: [
                "Periodically reading memory to find and correct errors",
                "Cleaning memory physically",
                "Refreshing memory contents",
                "Compacting memory for efficiency"
            ],
            correct: 0,
            category: "Memory"
        },
        {
            id: 139,
            question: "What does 'NVLink' provide compared to PCIe?",
            options: [
                "Higher bandwidth and direct GPU-to-GPU communication",
                "Lower latency for CPU-GPU communication",
                "Better power efficiency",
                "More lanes for expansion"
            ],
            correct: 0,
            category: "Hardware"
        },
        {
            id: 140,
            question: "In networking, what is 'RDMA' used for?",
            options: [
                "Remote Direct Memory Access - direct memory access between systems",
                "Routed Data Management Access - optimized routing",
                "Reliable Data Multicast Access - efficient broadcasting",
                "Redundant Data Mirroring Access - data replication"
            ],
            correct: 0,
            category: "Networking"
        },
        {
            id: 141,
            question: "What is 'heterogeneous computing' in modern processors?",
            options: [
                "Combining different types of processing units (CPU, GPU, etc.)",
                "Using processors from different manufacturers",
                "Mixing different architectures in one system",
                "Computing across heterogeneous networks"
            ],
            correct: 0,
            category: "Architecture"
        },
        {
            id: 142,
            question: "What does 'P-State' and 'C-State' refer to in CPU power management?",
            options: [
                "Performance states (frequency/voltage) and idle states",
                "Processor states and core states",
                "Power states and clock states",
                "Primary states and cache states"
            ],
            correct: 0,
            category: "Power"
        },
        {
            id: 143,
            question: "In storage, what is the 'write hole' problem in RAID?",
            options: [
                "Data loss during power failure while writing parity",
                "Slow write performance in certain configurations",
                "Physical damage from excessive writing",
                "Incompatibility between drive write speeds"
            ],
            correct: 0,
            category: "Storage"
        },
        {
            id: 144,
            question: "What is 'clock skew' in high-speed digital circuits?",
            options: [
                "Timing differences between clock signals reaching different components",
                "Jitter in clock frequency",
                "Drift in clock accuracy over time",
                "Variation in clock signal strength"
            ],
            correct: 0,
            category: "Hardware"
        },
        {
            id: 145,
            question: "What does 'TAA' compliance mean for government computers?",
            options: [
                "Trade Agreements Act - requiring specific country of origin for components",
                "Technical Assurance Agreement - security standards",
                "Total Asset Administration - inventory management",
                "Testing and Accreditation - quality certification"
            ],
            correct: 0,
            category: "Compliance"
        },
        {
            id: 146,
            question: "In cooling, what is 'delta T' measurement?",
            options: [
                "Temperature difference between component and ambient",
                "Time delay in temperature response",
                "Thermal transfer rate",
                "Temperature gradient across heatsink"
            ],
            correct: 0,
            category: "Cooling"
        },
        {
            id: 147,
            question: "What is 'memory rank' and how does it affect performance?",
            options: [
                "Group of memory chips accessed together; more ranks can increase bandwidth",
                "Memory quality rating; higher rank is better",
                "Memory speed classification",
                "Memory capacity tier"
            ],
            correct: 0,
            category: "Memory"
        },
        {
            id: 148,
            question: "What does 'PCIe lane negotiation' determine?",
            options: [
                "Maximum speed and lane count between devices",
                "Power delivery negotiation",
                "Protocol version compatibility",
                "Error correction method"
            ],
            correct: 0,
            category: "Hardware"
        },
        {
            id: 149,
            question: "In display technology, what is 'chroma subsampling'?",
            options: [
                "Reducing color resolution to save bandwidth",
                "Sampling colors for accuracy",
                "Adjusting color temperature",
                "Color calibration technique"
            ],
            correct: 0,
            category: "Display"
        },
        {
            id: 150,
            question: "What is 'specification compliance' for components like USB or HDMI?",
            options: [
                "Meeting official standards for interoperability",
                "Passing quality control tests",
                "Having required certifications",
                "Following manufacturer guidelines"
            ],
            correct: 0,
            category: "Standards"
        }
    ]
};

// DOM Elements
const elements = {
    timer: document.getElementById('timer'),
    combo: document.getElementById('combo'),
    score: document.getElementById('score'),
    team1Score: document.getElementById('team1-score'),
    team2Score: document.getElementById('team2-score'),
    team1Progress: document.getElementById('team1-progress'),
    team2Progress: document.getElementById('team2-progress'),
    team1Components: document.getElementById('team1-components'),
    team2Components: document.getElementById('team2-components'),
    team1Question: document.querySelector('#team1-question .question-text'),
    team2Question: document.querySelector('#team2-question .question-text'),
    startBtn: document.getElementById('start-btn'),
    resetBtn: document.getElementById('reset-btn'),
    difficultyBtns: document.querySelectorAll('.difficulty-btn'),
    answerBtns: document.querySelectorAll('.answer-btn'),
    gameMessage: document.getElementById('game-message'),
    messageTitle: document.querySelector('.message-title'),
    messageText: document.querySelector('.message-text'),
    messageOk: document.getElementById('message-ok'),
    statusLight: document.getElementById('status-light'),
    statusText: document.getElementById('status-text'),
    effectsOverlay: document.getElementById('effects-overlay'),
    questionsCount: document.getElementById('questions-count'),
    comboDisplay: document.getElementById('combo-display')
};

// Initialize the game
function initGame() {
    // Set initial state
    gameState.active = false;
    gameState.timeLeft = CONFIG.INITIAL_TIME;
    gameState.combo = 0;
    gameState.score = 0;
    gameState.currentTeam = 1;
    gameState.questionsAnswered = 0;
    gameState.gameCompleted = false;
    
    // Reset teams
    team1.score = 0;
    team1.components = 0;
    team1.progress = 0;
    team1.streak = 0;
    
    team2.score = 0;
    team2.components = 0;
    team2.progress = 0;
    team2.streak = 0;
    
    // Update UI
    updateUI();
    
    // Set initial questions
    generateQuestionsForTeams();
    
    // Show welcome message
    showMessage("TECHNICAL ENGLISH SIMULATOR", "Welcome to the PC Build Simulator!<br>Answer Technical English questions to build your PC.<br>Complete all 7 components before time runs out.", "START BUILD");
    
    // Update question count display
    const totalQuestions = QUESTIONS.easy.length + QUESTIONS.medium.length + QUESTIONS.hard.length;
    elements.questionsCount.textContent = totalQuestions;
}

// Update all UI elements
function updateUI() {
    // Timer and scores
    elements.timer.textContent = gameState.timeLeft;
    elements.combo.textContent = `${gameState.combo}x`;
    elements.score.textContent = gameState.score;
    elements.comboDisplay.textContent = `${gameState.combo}x`;
    
    // Team 1
    elements.team1Score.textContent = team1.score;
    elements.team1Progress.style.width = `${(team1.components / CONFIG.TOTAL_COMPONENTS) * 100}%`;
    elements.team1Components.textContent = `${team1.components}/${CONFIG.TOTAL_COMPONENTS}`;
    
    // Team 2
    elements.team2Score.textContent = team2.score;
    elements.team2Progress.style.width = `${(team2.components / CONFIG.TOTAL_COMPONENTS) * 100}%`;
    elements.team2Components.textContent = `${team2.components}/${CONFIG.TOTAL_COMPONENTS}`;
    
    // Update component visuals
    updatePCBuildVisuals();
    
    // Update status
    updateStatus();
}

// Update PC build visuals
function updatePCBuildVisuals() {
    const components = ['motherboard', 'cpu', 'ram', 'gpu', 'storage', 'psu', 'cooling'];
    
    // Team 1
    components.forEach((component, index) => {
        const placeholder = document.querySelector(`#team1-pc .component-placeholder[data-component="${component}"]`);
        if (placeholder) {
            if (index < team1.components) {
                placeholder.classList.add('installed');
                placeholder.classList.remove('error');
            } else {
                placeholder.classList.remove('installed');
                placeholder.classList.remove('error');
            }
        }
    });
    
    // Team 2
    components.forEach((component, index) => {
        const placeholder = document.querySelector(`#team2-pc .component-placeholder[data-component="${component}"]`);
        if (placeholder) {
            if (index < team2.components) {
                placeholder.classList.add('installed');
                placeholder.classList.remove('error');
            } else {
                placeholder.classList.remove('installed');
                placeholder.classList.remove('error');
            }
        }
    });
}

// Update game status
function updateStatus() {
    if (!gameState.active) {
        elements.statusLight.style.backgroundColor = "var(--warning)";
        elements.statusLight.style.boxShadow = "0 0 10px var(--warning)";
        elements.statusText.textContent = "SYSTEM STANDBY";
        return;
    }
    
    if (gameState.gameCompleted) {
        elements.statusLight.style.backgroundColor = "var(--success)";
        elements.statusLight.style.boxShadow = "0 0 15px var(--success)";
        elements.statusText.textContent = "SYSTEM BOOT SUCCESSFUL";
    } else if (gameState.timeLeft <= 10) {
        elements.statusLight.style.backgroundColor = "var(--error)";
        elements.statusLight.style.boxShadow = "0 0 15px var(--error)";
        elements.statusText.textContent = "TIME CRITICAL";
    } else {
        elements.statusLight.style.backgroundColor = "var(--accent-1)";
        elements.statusLight.style.boxShadow = "0 0 10px var(--accent-1)";
        elements.statusText.textContent = "SYSTEM ACTIVE";
    }
}

// Generate questions for both teams
function generateQuestionsForTeams() {
    const difficulty = gameState.currentDifficulty;
    const questions = QUESTIONS[difficulty];
    
    // Get random questions for each team
    const team1Question = questions[Math.floor(Math.random() * questions.length)];
    const team2Question = questions[Math.floor(Math.random() * questions.length)];
    
    team1.currentQuestion = team1Question;
    team2.currentQuestion = team2Question;
    
    // Update question displays
    updateQuestionDisplay(1, team1Question);
    updateQuestionDisplay(2, team2Question);
}

// Update question display for a team
function updateQuestionDisplay(teamNumber, question) {
    const questionElement = teamNumber === 1 ? elements.team1Question : elements.team2Question;
    
    if (question) {
        questionElement.innerHTML = `<span class="question-category">[${question.category}]</span><br>${question.question}`;
        
        // Update answer buttons
        const answerBtns = document.querySelectorAll(`.answer-btn[data-team="${teamNumber}"]`);
        answerBtns.forEach((btn, index) => {
            btn.textContent = question.options[index];
            btn.dataset.index = index;
            btn.classList.remove('correct', 'wrong');
        });
    } else {
        questionElement.textContent = "No question available";
    }
}

// Start the game
function startGame() {
    if (gameState.active) return;
    
    gameState.active = true;
    gameState.timeLeft = CONFIG.INITIAL_TIME;
    gameState.currentTeam = 1;
    
    // Start timer
    gameState.timerInterval = setInterval(updateTimer, 1000);
    
    // Generate initial questions
    generateQuestionsForTeams();
    
    // Update UI
    updateUI();
    
    // Show game started message
    showMessage("SYSTEM INITIALIZED", "PC Build Simulator active!<br>Answer questions correctly to install components.<br>Wrong answers cause short circuits.", "BEGIN BUILD");
    
    // Highlight active team
    document.querySelector('.team-1').classList.add('active');
    document.querySelector('.team-2').classList.remove('active');
}

// Update timer
function updateTimer() {
    if (!gameState.active) return;
    
    gameState.timeLeft--;
    elements.timer.textContent = gameState.timeLeft;
    
    // Update timer color based on time left
    if (gameState.timeLeft <= 10) {
        elements.timer.style.color = "var(--error)";
        elements.timer.style.animation = "pulse 0.5s infinite alternate";
        
        // Add time warning effect
        if (gameState.timeLeft <= 5) {
            createEffect('time-warning');
        }
    } else if (gameState.timeLeft <= 30) {
        elements.timer.style.color = "var(--warning)";
        elements.timer.style.animation = "pulse 1s infinite alternate";
    } else {
        elements.timer.style.color = "var(--accent-1)";
        elements.timer.style.animation = "none";
    }
    
    // Check for game over
    if (gameState.timeLeft <= 0) {
        endGame(false);
    }
    
    updateStatus();
}

// Handle answer selection
function handleAnswer(teamNumber, answerIndex) {
    if (!gameState.active) return;
    
    const team = teamNumber === 1 ? team1 : team2;
    const question = team.currentQuestion;
    
    if (!question) return;
    
    const isCorrect = parseInt(answerIndex) === question.correct;
    const answerBtns = document.querySelectorAll(`.answer-btn[data-team="${teamNumber}"]`);
    
    // Highlight correct/wrong answers
    answerBtns.forEach(btn => {
        const btnIndex = parseInt(btn.dataset.index);
        if (btnIndex === question.correct) {
            btn.classList.add('correct');
        } else if (btnIndex === parseInt(answerIndex) && !isCorrect) {
            btn.classList.add('wrong');
        }
    });
    
    // Handle correct answer
    if (isCorrect) {
        handleCorrectAnswer(teamNumber);
    } else {
        handleWrongAnswer(teamNumber);
    }
    
    // Switch teams
    switchTeams();
    
    // Generate new question for this team after delay
    setTimeout(() => {
        generateNewQuestion(teamNumber);
        resetAnswerButtons(teamNumber);
    }, 1500);
}

// Handle correct answer
function handleCorrectAnswer(teamNumber) {
    const team = teamNumber === 1 ? team1 : team2;
    
    // Increase combo
    gameState.combo = Math.min(gameState.combo + 1, CONFIG.COMBO_MULTIPLIER.length - 1);
    team.streak++;
    
    // Calculate points
    const basePoints = CONFIG.DIFFICULTY_POINTS[gameState.currentDifficulty];
    const comboMultiplier = CONFIG.COMBO_MULTIPLIER[gameState.combo];
    const points = Math.floor(basePoints * comboMultiplier);
    
    // Update scores
    gameState.score += points;
    team.score += points;
    
    // Add component if not all installed
    if (team.components < CONFIG.TOTAL_COMPONENTS) {
        team.components++;
        
        // Add time reward
        gameState.timeLeft += CONFIG.TIME_REWARD;
        
        // Create installation effect
        createEffect('component-install', teamNumber);
        
        // Play sound
        playSound('correct');
        
        // Check if team completed build
        if (team.components >= CONFIG.TOTAL_COMPONENTS) {
            checkGameCompletion();
        }
    }
    
    // Update UI
    updateUI();
    
    // Create combo effect if high combo
    if (gameState.combo >= 3) {
        createEffect('combo', teamNumber);
    }
}

// Handle wrong answer
function handleWrongAnswer(teamNumber) {
    const team = teamNumber === 1 ? team1 : team2;
    
    // Reset combo
    gameState.combo = 0;
    team.streak = 0;
    
    // Time penalty
    gameState.timeLeft = Math.max(0, gameState.timeLeft - CONFIG.TIME_PENALTY);
    
    // Create error effect
    createEffect('short-circuit', teamNumber);
    
    // Play sound
    playSound('wrong');
    
    // Update UI
    updateUI();
}

// Switch active team
function switchTeams() {
    gameState.currentTeam = gameState.currentTeam === 1 ? 2 : 1;
    
    // Update visual indicator
    if (gameState.currentTeam === 1) {
        document.querySelector('.team-1').classList.add('active');
        document.querySelector('.team-2').classList.remove('active');
    } else {
        document.querySelector('.team-2').classList.add('active');
        document.querySelector('.team-1').classList.remove('active');
    }
}

// Generate new question for a team
function generateNewQuestion(teamNumber) {
    const difficulty = gameState.currentDifficulty;
    const questions = QUESTIONS[difficulty];
    const question = questions[Math.floor(Math.random() * questions.length)];
    
    if (teamNumber === 1) {
        team1.currentQuestion = question;
        updateQuestionDisplay(1, question);
    } else {
        team2.currentQuestion = question;
        updateQuestionDisplay(2, question);
    }
    
    gameState.questionsAnswered++;
}

// Reset answer buttons for a team
function resetAnswerButtons(teamNumber) {
    const answerBtns = document.querySelectorAll(`.answer-btn[data-team="${teamNumber}"]`);
    answerBtns.forEach(btn => {
        btn.classList.remove('correct', 'wrong');
    });
}

// Check if game is completed
function checkGameCompletion() {
    // Check if both teams completed
    if (team1.components >= CONFIG.TOTAL_COMPONENTS && team2.components >= CONFIG.TOTAL_COMPONENTS) {
        endGame(true);
    } else if (team1.components >= CONFIG.TOTAL_COMPONENTS) {
        showMessage("TEAM ALPHA COMPLETE", "Team Alpha has successfully built their PC!<br>Team Beta needs to catch up!", "CONTINUE");
    } else if (team2.components >= CONFIG.TOTAL_COMPONENTS) {
        showMessage("TEAM BETA COMPLETE", "Team Beta has successfully built their PC!<br>Team Alpha needs to catch up!", "CONTINUE");
    }
}

// End the game
function endGame(success) {
    gameState.active = false;
    gameState.gameCompleted = true;
    
    // Clear timer
    clearInterval(gameState.timerInterval);
    
    // Determine winner
    let winner = "DRAW";
    if (team1.score > team2.score) {
        winner = "TEAM ALPHA";
    } else if (team2.score > team1.score) {
        winner = "TEAM BETA";
    }
    
    // Show end game message
    if (success) {
        createEffect('boot-success');
        playSound('complete');
        
        setTimeout(() => {
            showMessage(
                "SYSTEM BOOT SUCCESSFUL", 
                `Both PCs are fully operational!<br><br>
                <strong>Final Score:</strong><br>
                Team Alpha: ${team1.score} points<br>
                Team Beta: ${team2.score} points<br><br>
                <strong>Winner: ${winner}</strong><br><br>
                All components are functioning within specifications.`,
                "NEW BUILD"
            );
        }, 2000);
    } else {
        showMessage(
            "BOOT FAILED", 
            `Time's up! The PC build was not completed.<br><br>
            <strong>Progress:</strong><br>
            Team Alpha: ${team1.components}/7 components<br>
            Team Beta: ${team2.components}/7 components<br><br>
            Check configuration and try again.`,
            "RETRY"
        );
    }
    
    updateStatus();
}

// Create visual effects
function createEffect(type, teamNumber = null) {
    const overlay = elements.effectsOverlay;
    
    // Clear any existing effects
    overlay.innerHTML = '';
    overlay.style.opacity = '0';
    
    let effectHTML = '';
    let effectClass = '';
    
    switch(type) {
        case 'component-install':
            effectHTML = `<div class="effect-install"></div>`;
            effectClass = 'install-effect';
            overlay.style.opacity = '0.7';
            break;
            
        case 'short-circuit':
            effectHTML = `<div class="effect-short-circuit"></div>`;
            effectClass = 'short-circuit-effect';
            overlay.style.opacity = '0.8';
            
            // Add shake animation to the team panel
            if (teamNumber) {
                const teamPanel = document.querySelector(`.team-${teamNumber}`);
                teamPanel.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    teamPanel.style.animation = '';
                }, 500);
            }
            break;
            
        case 'combo':
            effectHTML = `<div class="effect-combo">COMBO x${gameState.combo}!</div>`;
            effectClass = 'combo-effect';
            overlay.style.opacity = '0.6';
            break;
            
        case 'boot-success':
            effectHTML = `
                <div class="effect-boot">
                    <div class="boot-circle"></div>
                    <div class="boot-text">SYSTEM ONLINE</div>
                </div>
            `;
            effectClass = 'boot-effect';
            overlay.style.opacity = '0.9';
            break;
            
        case 'time-warning':
            effectHTML = `<div class="effect-time-warning"></div>`;
            effectClass = 'time-warning-effect';
            overlay.style.opacity = '0.3';
            break;
    }
    
    // Add team color if applicable
    if (teamNumber) {
        const teamColor = teamNumber === 1 ? 'var(--team-1)' : 'var(--team-2)';
        effectHTML = effectHTML.replace('></div>', ` style="border-color: ${teamColor}; box-shadow: 0 0 30px ${teamColor}"></div>`);
    }
    
    overlay.innerHTML = effectHTML;
    overlay.classList.add(effectClass);
    
    // Remove effect after animation
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.classList.remove(effectClass);
            overlay.innerHTML = '';
        }, 500);
    }, 1000);
}

// Play sound
function playSound(type) {
    // In a real implementation, you would have actual audio files
    // This is a placeholder for sound effects
    try {
        const audio = document.getElementById(`${type}-sound`);
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
    } catch (e) {
        console.log("Audio playback error:", e);
    }
}

// Show message modal
function showMessage(title, text, buttonText) {
    elements.messageTitle.textContent = title;
    elements.messageText.innerHTML = text;
    elements.messageOk.textContent = buttonText;
    elements.gameMessage.classList.add('active');
}

// Hide message modal
function hideMessage() {
    elements.gameMessage.classList.remove('active');
}

// Event Listeners
elements.startBtn.addEventListener('click', startGame);

elements.resetBtn.addEventListener('click', () => {
    if (gameState.active) {
        if (confirm("Are you sure you want to reset the game? All progress will be lost.")) {
            clearInterval(gameState.timerInterval);
            initGame();
        }
    } else {
        initGame();
    }
});

// Difficulty buttons
elements.difficultyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        elements.difficultyBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Update game difficulty
        gameState.currentDifficulty = btn.dataset.difficulty;
        
        // If game is active, generate new questions with new difficulty
        if (gameState.active) {
            generateQuestionsForTeams();
        }
    });
});

// Answer buttons
elements.answerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (!gameState.active) return;
        
        const teamNumber = parseInt(btn.dataset.team);
        const answerIndex = parseInt(btn.dataset.index);
        
        // Only allow answering for active team
        if (teamNumber === gameState.currentTeam) {
            handleAnswer(teamNumber, answerIndex);
        }
    });
});

// Message OK button
elements.messageOk.addEventListener('click', () => {
    hideMessage();
    
    // If game hasn't started yet, start it after clicking OK on welcome message
    if (!gameState.active && !gameState.gameCompleted) {
        setTimeout(startGame, 500);
    }
    
    // If game was completed, restart
    if (gameState.gameCompleted) {
        setTimeout(() => {
            initGame();
        }, 500);
    }
});

// Initialize the game when page loads
window.addEventListener('DOMContentLoaded', () => {
    initGame();
    
    // Add some dynamic CSS for effects
    const style = document.createElement('style');
    style.textContent = `
        .effect-install {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            border: 5px solid;
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: installEffect 1s ease-out;
        }
        
        .effect-short-circuit {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255,0,85,0.3) 0%, transparent 70%);
            animation: shortCircuitEffect 0.5s ease-out;
        }
        
        .effect-combo {
            position: absolute;
            top: 50%;
            left: 50%;
            font-family: 'Orbitron', sans-serif;
            font-size: 3rem;
            font-weight: 900;
            color: var(--accent-2);
            text-shadow: 0 0 20px var(--accent-2);
            transform: translate(-50%, -50%);
            animation: comboEffect 1s ease-out;
        }
        
        .effect-boot {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        
        .boot-circle {
            width: 200px;
            height: 200px;
            border: 10px solid var(--success);
            border-radius: 50%;
            animation: bootCircle 2s ease-out;
        }
        
        .boot-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Orbitron', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--success);
            text-shadow: 0 0 10px var(--success);
            animation: bootText 2s ease-out;
        }
        
        .effect-time-warning {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255,0,85,0.1) 0%, transparent 70%);
            animation: timeWarning 0.5s infinite alternate;
        }
        
        @keyframes installEffect {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
        
        @keyframes shortCircuitEffect {
            0% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(1.5); }
        }
        
        @keyframes comboEffect {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
        
        @keyframes bootCircle {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.2); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes bootText {
            0% { opacity: 0; }
            70% { opacity: 0; }
            100% { opacity: 1; }
        }
        
        @keyframes timeWarning {
            0% { opacity: 0.1; }
            100% { opacity: 0.3; }
        }
        
        .question-category {
            color: var(--accent-1);
            font-size: 0.9rem;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
});