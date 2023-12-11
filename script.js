document.addEventListener('DOMContentLoaded', function() {
    const featureTagsInput = document.getElementById('gameFeatures');
    const featureOptions = document.getElementById('featureOptions');
    const selectedFeatures = document.getElementById('selectedFeatures');
    const supportedLanguagesDiv = document.getElementById('languageCheckboxes');
    const calculateMetricsBtn = document.getElementById('calculateMetrics');
    const gameTagsInput = document.getElementById('gameTags');
    const tagOptions = document.getElementById('tagOptions');
    const selectedTags = document.getElementById('selectedTags');
    
    const languagesData = ['German', 'French', 'Russian', 'Spanish___Spain', 'Simplified_Chinese',
    'Japanese', 'Portuguese___Brazil','Korean'];

    const gameFeaturesData = [
        'Single_player',
        'Steam_Achievements', 'Steam_Cloud', 'Full_controller_support',
        'Partial_Controller_Support', 'Steam_Trading_Cards',
        'Steam_Leaderboards', 'Remote_Play_Together',
        'Tracked_Controller_Support', 'VR_Only', 'Online_PvP',
        'Shared_Split_Screen_PvP', 'Stats', 'Shared_Split_Screen_Co_op',
        'Online_Co_op', 'Cross_Platform_Multiplayer', 'Includes_level_editor',
        'Remote_Play_on_TV', 'Steam_Workshop', 'Captions_available',
        'In_App_Purchases', 'VR_Supported', 'LAN_PvP', 'MMO', 'LAN_Co_op',
        'Remote_Play_on_Phone', 'Remote_Play_on_Tablet', 'Commentary_available',
        'Steam_Turn_Notifications', 'Includes_Source_SDK',
        'SteamVR_Collectibles'
      // Add more game features as needed
    ];
    
    const gameTagsData = [
        "1980s",
        "1990's",
        "2.5D",
        "2D",
        "2D Fighter",
        "2D Platformer",
        "360 Video",
        "3D",
        "3D Fighter",
        "3D Platformer",
        "3D Vision",
        "4 Player Local",
        "4X",
        "6DOF",
        "8-bit Music",
        "ATV",
        "Abstract",
        "Action",
        "Action RPG",
        "Action RTS",
        "Action Roguelike",
        "Action-Adventure",
        "Addictive",
        "Adventure",
        "Agriculture",
        "Aliens",
        "Alternate History",
        "Ambient",
        "America",
        "Animation & Modeling",
        "Anime",
        "Arcade",
        "Archery",
        "Arena Shooter",
        "Artificial Intelligence",
        "Assassin",
        "Asymmetric VR",
        "Asynchronous Multiplayer",
        "Atmospheric",
        "Audio Production",
        "Auto Battler",
        "Automation",
        "Automobile Sim",
        "BMX",
        "Base Building",
        "Baseball",
        "Based On A Novel",
        "Basketball",
        "Battle Royale",
        "Beat 'em up",
        "Beautiful",
        "Benchmark",
        "Bikes",
        "Birds",
        "Blood",
        "Board Game",
        "Boss Rush",
        "Bowling",
        "Boxing",
        "Building",
        "Bullet Hell",
        "Bullet Time",
        "CRPG",
        "Capitalism",
        "Card Battler",
        "Card Game",
        "Cartoon",
        "Cartoony",
        "Casual",
        "Cats",
        "Character Action Game",
        "Character Customization",
        "Chess",
        "Choices Matter",
        "Choose Your Own Adventure",
        "Cinematic",
        "City Builder",
        "Class-Based",
        "Classic",
        "Clicker",
        "Co-op",
        "Co-op Campaign",
        "Coding",
        "Cold War",
        "Collectathon",
        "Colony Sim",
        "Colorful",
        "Combat",
        "Combat Racing",
        "Comedy",
        "Comic Book",
        "Competitive",
        "Conspiracy",
        "Controller",
        "Conversation",
        "Cooking",
        "Cozy",
        "Crafting",
        "Creature Collector",
        "Cricket",
        "Crime",
        "Crowdfunded",
        "Cult Classic",
        "Cute",
        "Cyberpunk",
        "Cycling",
        "Dark",
        "Dark Comedy",
        "Dark Fantasy",
        "Dark Humor",
        "Dating Sim",
        "Deckbuilding",
        "Demons",
        "Design & Illustration",
        "Destruction",
        "Detective",
        "Difficult",
        "Dinosaurs",
        "Diplomacy",
        "Documentary",
        "Dog",
        "Dragons",
        "Drama",
        "Driving",
        "Dungeon Crawler",
        "Dungeons & Dragons",
        "Dynamic Narration",
        "Dystopian",
        "Early Access",
        "Economy",
        "Education",
        "Electronic",
        "Electronic Music",
        "Emotional",
        "Epic",
        "Episodic",
        "Escape Room",
        "Experience",
        "Experimental",
        "Exploration",
        "FMV",
        "FPS",
        "Faith",
        "Family Friendly",
        "Fantasy",
        "Farming",
        "Farming Sim",
        "Fast-Paced",
        "Feature Film",
        "Female Protagonist",
        "Fighting",
        "First-Person",
        "Fishing",
        "Flight",
        "Football (American)",
        "Football (Soccer)",
        "Foreign",
        "Fox",
        "Free to Play",
        "Funny",
        "Futuristic",
        "Gambling",
        "Game Development",
        "GameMaker",
        "Games Workshop",
        "Gaming",
        "God Game",
        "Golf",
        "Gore",
        "Gothic",
        "Grand Strategy",
        "Great Soundtrack",
        "Grid-Based Movement",
        "Gun Customization",
        "Hack and Slash",
        "Hacking",
        "Hand-drawn",
        "Hardware",
        "Heist",
        "Hentai",
        "Hero Shooter",
        "Hex Grid",
        "Hidden Object",
        "Historical",
        "Hockey",
        "Horror",
        "Horses",
        "Hunting",
        "Idler",
        "Illuminati",
        "Immersive",
        "Immersive Sim",
        "Indie",
        "Instrumental Music",
        "Intentionally Awkward Controls",
        "Interactive Fiction",
        "Inventory Management",
        "Investigation",
        "Isometric",
        "JRPG",
        "Jet",
        "Job Simulator",
        "Jump Scare",
        "Kickstarter",
        "LEGO",
        "LGBTQ+",
        "Lemmings",
        "Level Editor",
        "Life Sim",
        "Linear",
        "Local Co-Op",
        "Local Multiplayer",
        "Logic",
        "Loot",
        "Looter Shooter",
        "Lore-Rich",
        "Lovecraftian",
        "MMORPG",
        "MOBA",
        "Magic",
        "Mahjong",
        "Management",
        "Mars",
        "Martial Arts",
        "Massively Multiplayer",
        "Match 3",
        "Mature",
        "Mechs",
        "Medical Sim",
        "Medieval",
        "Memes",
        "Metroidvania",
        "Military",
        "Mini Golf",
        "Minigames",
        "Minimalist",
        "Mining",
        "Mod",
        "Moddable",
        "Modern",
        "Motocross",
        "Motorbike",
        "Mouse only",
        "Movie",
        "Multiplayer",
        "Multiple Endings",
        "Music",
        "Music-Based Procedural Generation",
        "Mystery",
        "Mystery Dungeon",
        "Mythology",
        "NSFW",
        "Narration",
        "Narrative",
        "Nature",
        "Naval",
        "Naval Combat",
        "Ninja",
        "Noir",
        "Nonlinear",
        "Nostalgia",
        "Nudity",
        "Offroad",
        "Old School",
        "On-Rails Shooter",
        "Online Co-Op",
        "Open World",
        "Open World Survival Craft",
        "Otome",
        "Outbreak Sim",
        "Parkour",
        "Parody",
        "Party",
        "Party Game",
        "Party-Based RPG",
        "Perma Death",
        "Philosophical",
        "Photo Editing",
        "Physics",
        "Pinball",
        "Pirates",
        "Pixel Graphics",
        "Platformer",
        "Point & Click",
        "Political",
        "Political Sim",
        "Politics",
        "Pool",
        "Post-apocalyptic",
        "Precision Platformer",
        "Procedural Generation",
        "Programming",
        "Psychedelic",
        "Psychological",
        "Psychological Horror",
        "Puzzle",
        "Puzzle Platformer",
        "PvE",
        "PvP",
        "Quick-Time Events",
        "RPG",
        "RPGMaker",
        "RTS",
        "Racing",
        "Real Time Tactics",
        "Real-Time",
        "Real-Time with Pause",
        "Realistic",
        "Reboot",
        "Relaxing",
        "Remake",
        "Replay Value",
        "Resource Management",
        "Retro",
        "Rhythm",
        "Robots",
        "Rock Music",
        "Roguelike",
        "Roguelike Deckbuilder",
        "Roguelite",
        "Roguevania",
        "Romance",
        "Rome",
        "Rugby",
        "Runner",
        "Sailing",
        "Sandbox",
        "Satire",
        "Sci-fi",
        "Science",
        "Score Attack",
        "Sequel",
        "Sexual Content",
        "Shoot 'Em Up",
        "Shooter",
        "Shop Keeper",
        "Short",
        "Side Scroller",
        "Silent Protagonist",
        "Simulation",
        "Singleplayer",
        "Skateboarding",
        "Skating",
        "Skiing",
        "Sniper",
        "Snooker",
        "Snow",
        "Snowboarding",
        "Social Deduction",
        "Software",
        "Software Training",
        "Sokoban",
        "Solitaire",
        "Souls-like",
        "Soundtrack",
        "Space",
        "Space Sim",
        "Spaceships",
        "Spectacle fighter",
        "Spelling",
        "Split Screen",
        "Sports",
        "Stealth",
        "Steam Machine",
        "Steampunk",
        "Story Rich",
        "Strategy",
        "Strategy RPG",
        "Stylized",
        "Submarine",
        "Superhero",
        "Supernatural",
        "Surreal",
        "Survival",
        "Survival Horror",
        "Swordplay",
        "Tabletop",
        "Tactical",
        "Tactical RPG",
        "Tanks",
        "Team-Based",
        "Tennis",
        "Text-Based",
        "Third Person",
        "Third-Person Shooter",
        "Thriller",
        "Tile-Matching",
        "Time Attack",
        "Time Management",
        "Time Manipulation",
        "Time Travel",
        "Top-Down",
        "Top-Down Shooter",
        "Touch-Friendly",
        "Tower Defense",
        "TrackIR",
        "Trading",
        "Trading Card Game",
        "Traditional Roguelike",
        "Trains",
        "Transhumanism",
        "Transportation",
        "Trivia",
        "Turn-Based",
        "Turn-Based Combat",
        "Turn-Based Strategy",
        "Turn-Based Tactics",
        "Tutorial",
        "Twin Stick Shooter",
        "Typing",
        "Underground",
        "Underwater",
        "Unforgiving",
        "Utilities",
        "VR",
        "Vampire",
        "Vehicular Combat",
        "Video Production",
        "Vikings",
        "Villain Protagonist",
        "Violent",
        "Visual Novel",
        "Voice Control",
        "Volleyball",
        "Voxel",
        "Walking Simulator",
        "War",
        "Wargame",
        "Warhammer 40K",
        "Web Publishing",
        "Well-Written",
        "Werewolves",
        "Western",
        "Wholesome",
        "Word Game",
        "World War I",
        "World War II",
        "Wrestling",
        "Zombies",
        "eSports"
    ];
  
    // Function to display options when user clicks on the input
    function displayOptions(input, optionsContainer, data) {
      optionsContainer.innerHTML = '';
      const filteredData = data.filter(tag => tag.toLowerCase().startsWith(input.value.toLowerCase()));
      filteredData.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('tag-option');
        div.textContent = item;
        div.addEventListener('click', () => {
          addTag(item, input === gameTagsInput ? selectedTags : selectedFeatures);
          input.value = '';
        });
        div.addEventListener('mouseover', () => {
          div.classList.add('hovered'); // Apply hover effect
        });
        div.addEventListener('mouseout', () => {
          div.classList.remove('hovered'); // Remove hover effect
        });
        optionsContainer.appendChild(div);
      });
      optionsContainer.classList.add('active');
    }
  
    // Function to add selected tag as a tag
    function addTag(tag, container) {
      const tagDiv = document.createElement('div');
      tagDiv.classList.add('tag');
      tagDiv.textContent = tag;
      tagDiv.addEventListener('click', () => {
        tagDiv.remove(); // Remove the clicked tag
      });
      container.appendChild(tagDiv);
    }
  
    // Prevent unchecking English in supported languages
    const englishCheckbox = supportedLanguagesDiv.querySelector('input[value="english"]');
    englishCheckbox.addEventListener('change', function() {
      this.checked = true;
    });
  
    // create global variables for user selection
    let selectedLanguagesArray = [];
    let selectedFeaturesArray = [];
    let gameTagsArray = [];
    let gamePrice = 0;

    //  TRANSFORM USER INPUT INTO NUMERICAL VALUES

    function generateTagArray(categories,selectedCategories) {
    // Create an array of zeros with the same length as categories
    const tagArray = new Array(categories.length).fill(0);

    // Iterate over the selectedTags and set the corresponding index to 1
    selectedCategories.forEach(tag => {
        const index = categories.indexOf(tag);
        if (index !== -1) {
            tagArray[index] = 1;
        }
    });

    return tagArray;
    }
   // Event listener for form submission
document.getElementById('gameForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission

    // Get input values
    gamePrice = document.getElementById('gamePrice').value;
    const selectedLanguages = Array.from(document.querySelectorAll('input[name="supportedLanguages"]:checked'))
      .map(checkbox => checkbox.value);
    const selectedFeatures = Array.from(document.querySelectorAll('#selectedFeatures .tag'))
      .map(tag => tag.textContent.trim());
    const gameTags = Array.from(document.querySelectorAll('#selectedTags .tag'))
      .map(tag => tag.textContent.trim());

    // Generate the arrays
    selectedLanguagesArray = generateTagArray(languagesData, selectedLanguages);
    selectedFeaturesArray = generateTagArray(gameFeaturesData, selectedFeatures);
    gameTagsArray = generateTagArray(gameTagsData, gameTags);

    // Attach the data to a global object on the window
    window.gameFormData = {
        gamePrice: parseFloat(gamePrice), // Ensuring gamePrice is a number
        selectedLanguagesArray,
        selectedFeaturesArray,
        gameTagsArray
    };

    // Log for testing
    console.log('Form Data:', window.gameFormData);

    // Dispatch a custom event after form submission
    const formSubmittedEvent = new Event('formSubmitted');
    window.dispatchEvent(formSubmittedEvent);
});
  
    // Function to handle display and hide of tag options
    function handleOptionsDisplay(input, optionsContainer) {
      document.addEventListener('click', function(e) {
        if (e.target !== input) {
          optionsContainer.classList.remove('active');
        }
      });
    }
  
    
    // Event listeners to display options when input is clicked
    featureTagsInput.addEventListener('input', function() {
      displayOptions(this, featureOptions, gameFeaturesData);
    });
  
    gameTagsInput.addEventListener('input', function() {
      displayOptions(this, tagOptions, gameTagsData);
    });
  
    // Hide tag options when user clicks outside the input box
    handleOptionsDisplay(featureTagsInput, featureOptions);
    handleOptionsDisplay(gameTagsInput, tagOptions);
  
    // Move the calculateMetrics button below the form
    calculateMetricsBtn.style.marginTop = '20px';
  });
