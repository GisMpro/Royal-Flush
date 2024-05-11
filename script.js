function modifyHealth(amount) {
    var health = document.getElementById('health');
    var currentHealth = parseInt(health.textContent);
    currentHealth += amount;
    if (currentHealth < 0) currentHealth = 0; // Prevent health from going negative
    health.textContent = currentHealth;
}

function modifyArmor(amount) {
    var armor = document.getElementById('armor');
    var currentArmor = parseInt(armor.textContent);
    currentArmor += amount;
    if (currentArmor < 0) currentArmor = 0; // Prevent armor from going negative
    armor.textContent = currentArmor;
}

function modifyMana(amount) {
    var mana = document.getElementById('mana');
    var currentMana = parseInt(mana.textContent);
    currentMana += amount;
    if (currentMana < 0) currentMana = 0; // Prevent mana from going negative
    if (currentMana > 10) currentMana = 10; // Mana cap at 10
    mana.textContent = currentMana;
}

let isTurnActive = false;
let currentMana = 0;

window.onload = function() {
    let isFirst = localStorage.getItem('isFirst') === 'true';
    currentMana = isFirst ? 1 : 0;
    document.getElementById('mana').textContent = currentMana;

    // Đặt trạng thái ban đầu của nút dựa trên người chơi đi trước
    if (isFirst) {
        document.getElementById('turn-button').textContent = "End your turn";
        isTurnActive = true; // Bắt đầu lượt vì người này đi trước
    } else {
        document.getElementById('turn-button').textContent = "Start your turn";
        isTurnActive = false; // Chưa bắt đầu lượt vì người này đi sau
    }
};

function toggleTurn() {
    isTurnActive = !isTurnActive;
    document.getElementById('turn-button').textContent = isTurnActive ? "End your turn" : "Start your turn";

    // Tăng mana khi bắt đầu lượt mới, cho cả người đi trước và người đi sau
    if (isTurnActive) {
        currentMana++;
        document.getElementById('mana').textContent = currentMana;
    }
}

function resetGame() {
    window.location.href = 'index.html'; // Điều hướng trở lại trang bắt đầu
}

let maxMana = 10;  // Giới hạn mana hiện tại là 10

function modifyMana(amount) {
    var mana = document.getElementById('mana');
    var currentMana = parseInt(mana.textContent);
    currentMana += amount;
    if (currentMana < 0) currentMana = 0; // Ngăn không cho mana đi xuống dưới 0
    if (currentMana > maxMana) currentMana = maxMana; // Ngăn không cho mana vượt quá giới hạn
    mana.textContent = currentMana;
}

function increaseManaCap() {
    maxMana = 15;  // Thay đổi giới hạn mana lên 15
    document.getElementById('mana').textContent = Math.min(parseInt(document.getElementById('mana').textContent), maxMana);
    console.log("Giới hạn mana đã được tăng lên 15.");
}

function toggleMenu() {
    let menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

function displayCards(filter) {
    let cards = loadCardsFromStorage();
    let container = document.getElementById('cards-container');
    container.style.display = 'block'; // Hiển thị phần thư viện
    container.innerHTML = ''; // Xóa nội dung trước đó

    cards.filter(card => filter === 'all' || card.type === filter).forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `<h3>${card.name}</h3><img src="${card.imagePath}" alt="${card.name}"><p>Mana Cost: ${card.manaCost}</p><p>${card.description}</p>`;
        container.appendChild(cardElement);
    });
}

function goToLibrary() {
    window.location.href = 'library.html'; // Điều hướng đến trang thư viện mới
}

// Hàm ẩn tất cả các bảng
function hideAllTables() {
    let tables = document.getElementsByClassName('cards-table');
    for (let table of tables) {
        table.style.display = "none";
    }
}

// Hiển thị hoặc ẩn danh sách loại phụ và hiển thị bảng mặc định
function showSubTypeOptions(type) {
    let subTypeContainer = document.getElementById('sub-type-container');
    if (type === "Cards") {
        subTypeContainer.style.display = "block"; // Hiển thị danh sách các tộc phụ

        // Thiết lập giá trị mặc định của tộc phụ
        let defaultSubType = "All";
        let subTypeSelect = document.getElementById('sub-type');
        subTypeSelect.value = defaultSubType;

        // Hiển thị bảng của tộc phụ mặc định
        displaySubTypeCards(defaultSubType);
    }

    else {
        subTypeContainer.style.display = "All"; // Ẩn nếu không phải Minion
        hideAllTables(); // Ẩn tất cả các bảng tộc phụ
        displayCards(type); // Hiển thị các lá bài của loại chính khác
    }
}

// Hiển thị bảng trống cho mọi tộc phụ
function displaySubTypeCards(subType) {
    // Xóa nội dung bảng trước đó
    let allGrid = document.getElementById('all-grid');
    let beastGrid = document.getElementById('beast-grid');
    let demonGrid = document.getElementById('demon-grid');
    let dragonGrid = document.getElementById('dragon-grid');
    let elementalGrid = document.getElementById('elemental-grid');
    let mechGrid = document.getElementById('mech-grid');
    let murlocGrid = document.getElementById('murloc-grid');
    let nagaGrid = document.getElementById('naga-grid');
    let pirateGrid = document.getElementById('pirate-grid');
    let normalGrid = document.getElementById('normal-grid');
    let spellGrid = document.getElementById('spell-grid');
    let weaponGrid = document.getElementById('weapon-grid');

    allGrid.innerHTML = '';
    beastGrid.innerHTML = '';
    demonGrid.innerHTML = '';
    dragonGrid.innerHTML = '';
    elementalGrid.innerHTML = '';
    mechGrid.innerHTML = '';
    murlocGrid.innerHTML = '';
    nagaGrid.innerHTML = '';
    pirateGrid.innerHTML = '';
    normalGrid.innerHTML = '';
    spellGrid.innerHTML = '';
    weaponGrid.innerHTML = '';
    
    // Kiểm tra xem subType có phải là "All" không
    if (subType === "All") {
        // Tạo bảng trống
        let table = document.createElement('div');
        table.className = 'blank-table'; // Sử dụng lớp CSS "blank-table" để thêm định dạng tùy chỉnh
        table.innerHTML = `<p></p>`;
    
            // Tạo phần tử chứa lưới hình ảnh All
        let grid = document.createElement('div');
        grid.className = 'all-grid';

        // Tạo danh sách các đường dẫn ảnh cho tộc "All"
        let allImages = [
            "images/Mistake.png",
            "images/Amalgam-of-the-Deep.png"
           
            // Thêm các đường dẫn ảnh khác vào đây
        ];

        applyImageOnclick(allImages, 'all-grid', 'all');
        // Thêm tất cả các hình ảnh vào bảng
        allImages.forEach(imagePath => {
            let imageElement = document.createElement('img');
            imageElement.src = imagePath;
            imageElement.alt = "All Image";
            imageElement.className = 'all-image'; // Đảm bảo lớp này có trong CSS
            grid.appendChild(imageElement);
        });

                // Thêm lưới vào bảng trống
        table.appendChild(grid);

        // Thêm bảng vào vùng chứa
        container.appendChild(table);
    }

    if (subType === "Beast") {
          // Tạo bảng trống
        let table = document.createElement('div');
        table.className = 'blank-table'; // Sử dụng lớp CSS "blank-table" để thêm định dạng tùy chỉnh
        table.innerHTML = `<p></p>`;
    
            // Tạo phần tử chứa lưới hình ảnh Beast
        let grid = document.createElement('div');
        grid.className = 'beast-grid';

        // Tạo danh sách các đường dẫn ảnh cho tộc "Beast"
        let beastImages = [
            "images/Butterlight.png",
            "images/Mistake.png",
            "images/The Parrot.png",
            "images/The-Toad.png",
            "images/Tinysaurus.png",
            "images/Amalgam-of-the-Deep.png",
            "images/Armor-Bettle.png",
            "images/Dirty-Rat.png",
            "images/Foreign-Object.png",
            "images/Halazzi.png",
            "images/Jungle-Panther.png",
            "images/Killer-Bee.png",
            "images/Mumy-Vulture.png",
            "images/Murkspark-Eel.png",
            "images/Parrite.png",
            "images/Basher-Behemoth.png",
            "images/Foxible.png",
            "images/Gahz'rilla.png",
            "images/Gattlesnake.png",
            "images/Gloom-Stag.png",
            "images/Mecha-Betsa.png",
            "images/Monkey-Soilder.png",
            "images/Swordfish-Audio.png",
            "images/Toxic-Scorpion.png",
            "images/Krag'wa.png",
            "images/Ornery-Direhorn.png",
            "images/Sand Shark.png",
            "images/Spirit-of-Hound.png",
            "images/Al'ar.png",
            "images/Darius.png",
            "images/Greedily-Shark.png",
            "images/Romrasaurus.png",
            "images/Subject-9.png",
            "images/Trampling-Rhino.png",
            "images/Worm-Giant.png",
            "images/Jade-Elephant.png",
            "images/Midnight-Worf.png",
            "images/Chi'Ji.png",
            "images/Chimera.png",
            "images/Akali.png",
            "images/Hydralodon.png",
            "images/Bulltron.png",
            "images/Hadronox.png",
            "images/Shirvalla.png",
            "images/Strench-Hydra.png",
            "images/King-Krush.png",
            "images/Mamorest.png",
            "images/Typhon.png"
            // Thêm các đường dẫn ảnh khác vào đây
        ];

        applyImageOnclick(beastImages, 'beast-grid', 'beast');
        // Thêm tất cả các hình ảnh vào bảng
        beastImages.forEach(imagePath => {
            let imageElement = document.createElement('img');
            imageElement.src = imagePath;
            imageElement.alt = "Beast Image";
            imageElement.className = 'beast-image'; // Đảm bảo lớp này có trong CSS
            grid.appendChild(imageElement);
        });

                // Thêm lưới vào bảng trống
        table.appendChild(grid);

        // Thêm bảng vào vùng chứa
        container.appendChild(table);
    }

       if (subType === "Demon") {
           // Tạo bảng trống
        let table = document.createElement('div');
        table.className = 'blank-table'; // Sử dụng lớp CSS "blank-table" để thêm định dạng tùy chỉnh
        table.innerHTML = `<p></p>`;

            // Tạo phần tử chứa lưới hình ảnh Demon
        let grid = document.createElement('div');
        grid.className = 'demon-grid';

        // Tạo danh sách các đường dẫn ảnh cho tộc "Demon"
        let demonImages = [
            "images/Chain-Warden.png",
            "images/Bloody-Imp.png",
            "images/Felarcher.png",
            "images/Finding-Imp.png",
            "images/Flame-Imp.png",
            "images/Letter-Imp.png",
            "images/Mistake.png",
            "images/Patches.png",
            "images/Voil-Elemental.png",
            "images/Amalgam-of-the-Deep.png",
            "images/Cultist-Imp.png",
            "images/Feltalker.png",
            "images/Felwaiting.png",
            "images/Shadown-Imp.png",
            "images/Southsea-Imp.png",
            "images/The-Nightmare.png",
            "images/Bartending-Imp.png",
            "images/Betray-Imp.png",
            "images/Doubling-Imp.png",
            "images/Felhunter.png",
            "images/Fel-Whelp.png",
            "images/Fervent-Imp.png",
            "images/Altruis.png",
            "images/Father-of-The-Imps.png",
            "images/Hiden-Imp.png",
            "images/Lakkari-Felhound.png",
            "images/Zavas.png",
            "images/Anetheron.png",
            "images/Deepsea-Dominator.png",
            "images/Doomguard.png",
            "images/Felrockstar.png",
            "images/Kayn.png",
            "images/Tickatus.png",
            "images/Aranast-Bloodmother.png",
            "images/Felguardian.png",
            "images/Grave-Digger.png",
            "images/Kael'thas.png",
            "images/Saregas.png",
            "images/Dar'Khan.png",
            "images/Magtheridon.png",
            "images/Darkweaver.png",
            "images/Mecha-Org.png",
            "images/Nether-Fiend.png",
            "images/Jaraxxus.png",
            "images/Imp-Giant.png",
            "images/Sire-Denathrius.png"
            // Thêm các đường dẫn ảnh khác vào đây
        ];

        applyImageOnclick(demonImages, 'demon-grid', 'demon');

        // Thêm tất cả các hình ảnh vào bảng
        demonImages.forEach(imagePath => {
            let imageElement = document.createElement('img');
            imageElement.src = imagePath;
            imageElement.alt = "Demon Image";
            imageElement.className = 'demon-image'; // Đảm bảo lớp này có trong CSS
            grid.appendChild(imageElement);
        });

                // Thêm lưới vào bảng trống
        table.appendChild(grid);

        // Thêm bảng vào vùng chứa
        container.appendChild(table);
    }

        if (subType === "Dragon") {
           // Tạo bảng trống
        let table = document.createElement('div');
        table.className = 'blank-table'; // Sử dụng lớp CSS "blank-table" để thêm định dạng tùy chỉnh
        table.innerHTML = `<p></p>`;

            // Tạo phần tử chứa lưới hình ảnh Dragon
        let grid = document.createElement('div');
        grid.className = 'dragon-grid';

        // Tạo danh sách các đường dẫn ảnh cho tộc "Dragon"
        let dragonImages = [
            "images/Baby-Drake.png",
            "images/Black-Whelp.png",
            "images/Happy-Whelp.png",
            "images/Harvest-Whelp.png",
            "images/Mechawing.png",
            "images/Mistake.png",
            "images/Ship's-Churugeon.png",
            "images/Amalgam-of-the-Deep.png",
            "images/Dragon-Tails.png",
            "images/Foreign-Object.png",
            "images/Iron-Whelp.png",
            "images/Brightwing.png",
            "images/Drabone.png",
            "images/Ember-Whelp.png",
            "images/Fel-Whelp.png",
            "images/Full-Whelp.png",
            "images/Jade-Wyrm.png",
            "images/Astral-Serpent.png",
            "images/Cha-in-Chain.png",
            "images/Crystal-Drake.png",
            "images/Khaynan-Ferreira.png",
            "images/Lightning-Drake.png",
            "images/Guardian-Drake.png",
            "images/Malygos.png",
            "images/Marsh-Drake.png",
            "images/Starlight-Drake.png",
            "images/Blackwing.png",
            "images/Evasive-Wyrm.png",
            "images/Exploragon.png",
            "images/Bust-Drake.png",
            "images/Clay-Drake.png",
            "images/Chimera.png",
            "images/Onixia.png",
            "images/Primordial-Drake.png",
            "images/Ysera.png",
            "images/Alextraza.png",
            "images/Fye.png",
            "images/Wyvern.png",
            "images/Deathwing.png",
            "images/Heartraza.png",
            "images/Nozari.png"

            // Thêm các đường dẫn ảnh khác vào đây
        ];

        applyImageOnclick(dragonImages, 'dragon-grid', 'dragon');

        // Thêm tất cả các hình ảnh vào bảng
        dragonImages.forEach(imagePath => {
            let imageElement = document.createElement('img');
            imageElement.src = imagePath;
            imageElement.alt = "Dragon Image";
            imageElement.className = 'dragon-image'; // Đảm bảo lớp này có trong CSS
            grid.appendChild(imageElement);
        });

                // Thêm lưới vào bảng trống
        table.appendChild(grid);

        // Thêm bảng vào vùng chứa
        container.appendChild(table);
    }

   if (subType === "Elemental") {
        // Tạo bảng trống
        let table = document.createElement('div');
        table.className = 'blank-table'; // Sử dụng lớp CSS "blank-table" để thêm định dạng tùy chỉnh
        table.innerHTML = `<p></p>`;
    
            // Tạo phần tử chứa lưới hình ảnh Elemental
        let grid = document.createElement('div');
        grid.className = 'elemental-grid';

        // Tạo danh sách các đường dẫn ảnh cho tộc "Elemental"
        let elementalImages = [
            "images/Destroyer-Giant.png",
            "images/Fizzy.png",
            "images/Airlemental.png",
            "images/Barrier-Keeper.png",
            "images/Glacial-Shard.png",
            "images/Mistake.png",
            "images/Voil-Elemental.png",
            "images/Amalgam-of-the-Deep.png",
            "images/Bloody-Crystal.png",
            "images/Sand-Tornado.png",
            "images/Voltor.png",
            "images/Gahz'rilla.png",
            "images/Igneous-Elemental.png",
            "images/Smite-Elemental.png",
            "images/Astral-Serpent.png",
            "images/Candle-Elemental.png",
            "images/Crystal-Elemental.png",
            "images/Gold-Elemental.png",
            "images/Lightning-Drake.png",
            "images/Pryoxis.png",
            "images/Rock-Elemental.png",
            "images/Sparks-Elemental.png",
            "images/Tol'vir-Stonehaper.png",
            "images/Water-Elemental.png",
            "images/Wood-Elemental.png",
            "images/Al'ar.png",
            "images/Diamondary.png",
            "images/Fost-Elemental.png",
            "images/Moss-Elemental.png",
            "images/Nature-Elemental.png",
            "images/Ozruk.png",
            "images/Rotten-Applebaum.png",
            "images/Snow-Giant.png",
            "images/Diamond-Elemental.png",
            "images/Fire-Elemental.png",
            "images/Jade-Elephant.png",
            "images/Tarim.png",
            "images/Thaddius.png",
            "images/Ragnaros.png",
            "images/Al'Akir.png",
            "images/Wyvern.png",
            "images/Arcane-Giant.png",
            "images/Magma-Giant.png"
            // Thêm các đường dẫn ảnh khác vào đây
        ];

        applyImageOnclick(elementalImages, 'elemental-grid', 'elemental');
        // Thêm tất cả các hình ảnh vào bảng
        elementalImages.forEach(imagePath => {
            let imageElement = document.createElement('img');
            imageElement.src = imagePath;
            imageElement.alt = "Elemental Image";
            imageElement.className = 'elemental-image'; // Đảm bảo lớp này có trong CSS
            grid.appendChild(imageElement);
        });

                // Thêm lưới vào bảng trống
        table.appendChild(grid);

        // Thêm bảng vào vùng chứa
        container.appendChild(table);
    }

       if (subType === "Mech") {
        // Tạo bảng trống
        let table = document.createElement('div');
        table.className = 'blank-table'; // Sử dụng lớp CSS "blank-table" để thêm định dạng tùy chỉnh
        table.innerHTML = `<p></p>`;
    
            // Tạo phần tử chứa lưới hình ảnh Mech
        let grid = document.createElement('div');
        grid.className = 'all-grid';

        // Tạo danh sách các đường dẫn ảnh cho tộc "Mech"
        let mechImages = [
            "images/Bassic-Supporter.png",
            "images/MechaWing.png",
            "images/Mistake.png",
            "images/Ironhead.png",
            "images/Sn1p-Sn4p.png",
            "images/Amalgam-of-the-Deep.png",
            "images/Auto-Barber.png",
            "images/Botbulbot.png",
            "images/ClaErr.png",
            "images/Mur-Lech.png",
            "images/Hellooo.png",
            "images/Axiomar.png",
            "images/BarTENder.png",
            "images/Bomb-Spider.png",
            "images/Clockwork-Goblin.png",
            "images/Diver-Bot.png",
            "images/Gigavolt-Giggler.png",
            "images/Mecha-Betsa.png",
            "images/Nurse-Bot.png",
            "images/Security-Bot.png",
            "images/Swordfish-Audio.png",
            "images/Big-Boxer.png",
            "images/Fiestaboom.png",
            "images/Omega-Destroyer.png",
            "images/Omega-Nurse.png",
            "images/Protectore.png",
            "images/Zapcrab.png",
            "images/Burning-Machine.png",
            "images/Cr4p-B0t.png",
            "images/K1nght-Bot.png",
            "images/Subject-9.png",
            "images/Thorion.png",
            "images/Bit-Girid.png",
            "images/Skyguard-Bastion.png",
            "images/Zytheron.png",
            "images/Mecha-Org.png",
            "images/Pylon-Zilliax.png",
            "images/Bulltron.png",
            "images/Jaraxxus.png",
            "images/Reaper-4000.png",
            "images/Mech-Giant.png",
           
            // Thêm các đường dẫn ảnh khác vào đây
        ];

        applyImageOnclick(mechImages, 'mech-grid', 'mech');
        // Thêm tất cả các hình ảnh vào bảng
        mechImages.forEach(imagePath => {
            let imageElement = document.createElement('img');
            imageElement.src = imagePath;
            imageElement.alt = "Mech Image";
            imageElement.className = 'mech-image'; // Đảm bảo lớp này có trong CSS
            grid.appendChild(imageElement);
        });

                // Thêm lưới vào bảng trống
        table.appendChild(grid);

        // Thêm bảng vào vùng chứa
        container.appendChild(table);
    }

       if (subType === "Murloc") {
        // Tạo bảng trống
        let table = document.createElement('div');
        table.className = 'blank-table'; // Sử dụng lớp CSS "blank-table" để thêm định dạng tùy chỉnh
        table.innerHTML = `<p></p>`;
    
            // Tạo phần tử chứa lưới hình ảnh Murloc
        let grid = document.createElement('div');
        grid.className = 'all-grid';

        // Tạo danh sách các đường dẫn ảnh cho tộc "Murloc"
        let murlocImages = [
            "images/Abyssal-Mystic.png",
            "images/Cheatloc.png",
            "images/Fervent-Murloc.png",
            "images/Grumscale-Chum.png",
            "images/Gunfin.png",
            "images/Mistake.png",
            "images/Murgur-Murgur.png",
            "images/Murloc-Tidecaller.png",
            "images/Toxic-Murloc.png",
            "images/Amalgam-of-the-Deep.png",
            "images/Cheesending.png",
            "images/Fishflinger.png",
            "images/Fixgineer.png",
            "images/Flurgl.png",
            "images/Geologist-Toad.png",
            "images/Greed-ing-Murloc.png",
            "images/Lanternfin-Luminary.png",
            "images/Leader-of-platoon.png",
            "images/Mur-Lech.png",
            "images/Rockpool-Murloc.png",
            "images/Sir-Finley.png",
            "images/Basher-Behemoth.png",
            "images/Fireflicker-Trickster.png",
            "images/Galakrond.png",
            "images/Gobsmack-Grunt.png",
            "images/Murblock.png",
            "images/Murloc-Holmes.png",
            "images/Preparer-Dinner.png",
            "images/Sandfin-Chopper.png",
            "images/Scargil.png",
            "images/ThaiBoxer-Murloc.png",
            "images/Domestiloc.png",
            "images/Fin-ja.png",
            "images/Howloc.png",
            "images/Murcook.png",
            "images/Murgician.png",
            "images/sWitch.png",
            "images/Corrupted-Seer.png",
            "images/Flash-Eyes.png",
            "images/Gigafin.png",
            "images/Mutanus.png",
            "images/Murloc-Giant.png",
            // Thêm các đường dẫn ảnh khác vào đây
        ];

        applyImageOnclick(murlocImages, 'murloc-grid', 'murloc');
        // Thêm tất cả các hình ảnh vào bảng
        murlocImages.forEach(imagePath => {
            let imageElement = document.createElement('img');
            imageElement.src = imagePath;
            imageElement.alt = "Murloc Image";
            imageElement.className = 'murloc-image'; // Đảm bảo lớp này có trong CSS
            grid.appendChild(imageElement);
        });

                // Thêm lưới vào bảng trống
        table.appendChild(grid);

        // Thêm bảng vào vùng chứa
        container.appendChild(table);
    }

       if (subType === "Naga") {
        // Tạo bảng trống
        let table = document.createElement('div');
        table.className = 'blank-table'; // Sử dụng lớp CSS "blank-table" để thêm định dạng tùy chỉnh
        table.innerHTML = `<p></p>`;
    
            // Tạo phần tử chứa lưới hình ảnh Naga
        let grid = document.createElement('div');
        grid.className = 'all-grid';

        // Tạo danh sách các đường dẫn ảnh cho tộc "Naga"
        let nagaImages = [
            "images/Chain-Warden.png",
            "images/Abyssal-Mystic.png",
            "images/Damage-of-Medusa.png",
            "images/Early-Soilder.png",
            "images/Dozing-Kelpkeeper.png",
            "images/Mistake.png",
            "images/Amalgam-of-the-Deep.png",
            "images/Lunaga.png",
            "images/Naz'jan.png",
            "images/Quiet-Keeper.png",
            "images/Sylvana.png",
            "images/Beastkeeper.png",
            "images/Chiana.png",
            "images/Emeraldscale-Archer.png",
            "images/Ocean's-Fury.png",
            "images/Sentinel-of-Dept.png",
            "images/Snake-Eyes.png",
            "images/Teacher-of-Dept.png",
            "images/Clawbreaker.png",
            "images/Fungal-Bruiser.png",
            "images/Octochef.png",
            "images/Squidface.png",
            "images/Weapon-Master.png",
            "images/Corrupted-Seer.png",
            "images/Deepsea-Dominator.png",
            "images/Queen-Azshara.png",
            "images/Sirena.png",
            "images/Sivara.png",
            "images/Zephyra.png",
            "images/HeaveNaga.png",
            "images/Sivanas.png",
            "images/Vashj.png",
            "images/Healer-of-Tides.png",
            "images/Maridia.png",
            "images/Thalassor.png",
            "images/Tide-Master.png",
            "images/Primeval-Terror.png",
            "images/Naga-Giant.png",
            "images/Soggoth.png",
            "images/Deep-Giant.png"
            // Thêm các đường dẫn ảnh khác vào đây
        ];

        applyImageOnclick(nagaImages, 'naga-grid', 'naga');
        // Thêm tất cả các hình ảnh vào bảng
        nagaImages.forEach(imagePath => {
            let imageElement = document.createElement('img');
            imageElement.src = imagePath;
            imageElement.alt = "Naga Image";
            imageElement.className = 'naga-image'; // Đảm bảo lớp này có trong CSS
            grid.appendChild(imageElement);
        });

                // Thêm lưới vào bảng trống
        table.appendChild(grid);

        // Thêm bảng vào vùng chứa
        container.appendChild(table);
    }

       if (subType === "Pirate") {
        // Tạo bảng trống
        let table = document.createElement('div');
        table.className = 'blank-table'; // Sử dụng lớp CSS "blank-table" để thêm định dạng tùy chỉnh
        table.innerHTML = `<p></p>`;
    
            // Tạo phần tử chứa lưới hình ảnh Pirate
        let grid = document.createElement('div');
        grid.className = 'pirate-grid';

        // Tạo danh sách các đường dẫn ảnh cho tộc "Pirate"
        let pirateImages = [
            "images/Betting-Gambler.png",
            "images/Cleaner-of-Ship.png",
            "images/Grumscale-Chum.png",
            "images/Jolly-Roger.png",
            "images/Mistake.png",
            "images/Patches.png",
            "images/Peggy-Plunder.png",
            "images/Prize-Plunderer.png",
            "images/Ricky-Skiper.png",
            "images/Ship's-Churugeon.png",
            "images/Swashburglar.png",
            "images/Amalgam-of-the-Deep.png",
            "images/Bloodsail-Howler.png",
            "images/Calling-Gambler.png",
            "images/Harbor-Scamp.png",
            "images/Maiev.png",
            "images/Skyraider-Voth.png",
            "images/Southsea-Imp.png",
            "images/Blaze-Barnacle.png",
            "images/Captain-Eudora.png",
            "images/Folding-Gambler.png",
            "images/Moroes.png",
            "images/Redbeard-Rumblegun.png",
            "images/Twin-Org.png",
            "images/Valeera-Sanguinar.png",
            "images/Ghost-of-Ship.png",
            "images/Hogger.png",
            "images/Khaynan-Ferreira.png",
            "images/Octochef.png",
            "images/Raising-Gambler.png",
            "images/Southsea-Captain.png",
            "images/Spectral-Mariner.png",
            "images/Squidface.png",
            "images/Stomwing-Freebooter.png",
            "images/Weapon-Master.png",
            "images/All-ing-Gambler.png",
            "images/Candlewick-Corsair.png",
            "images/Admiral-Hooktust.png",
            "images/Curse-Castaway.png",
            "images/Marin.png",
            "images/Captain-Hooktust.png",
            "images/Valeera.png",
            "images/Garrosh.png"
            // Thêm các đường dẫn ảnh khác vào đây
        ];

        applyImageOnclick(pirateImages, 'pirate-grid', 'pirate');
        // Thêm tất cả các hình ảnh vào bảng
        pirateImages.forEach(imagePath => {
            let imageElement = document.createElement('img');
            imageElement.src = imagePath;
            imageElement.alt = "Pirate Image";
            imageElement.className = 'pirate-image'; // Đảm bảo lớp này có trong CSS
            grid.appendChild(imageElement);
        });

                // Thêm lưới vào bảng trống
        table.appendChild(grid);

        // Thêm bảng vào vùng chứa
        container.appendChild(table);
    }

       if (subType === "Normal") {
        // Tạo bảng trống
        let table = document.createElement('div');
        table.className = 'blank-table'; // Sử dụng lớp CSS "blank-table" để thêm định dạng tùy chỉnh
        table.innerHTML = `<p></p>`;
    
            // Tạo phần tử chứa lưới hình ảnh Normal
        let grid = document.createElement('div');
        grid.className = 'normal-grid';

        // Tạo danh sách các đường dẫn ảnh cho tộc "Normal"
        let normalImages = [
            "images/Norn.png",
            "images/Madame-Lazul.png",
            "images/Magic-Book.png",
            "images/Miracle-Salesman.png",
            "images/Pawn-Chessman.png",
            "images/Stalker-Cannon.png",
            "images/Bishop-Chessman.png",
            "images/Chainwielder-Shaman.png",
            "images/Dark-Warrior.png",
            "images/Gadgetzan-Trickster.png",
            "images/Icereaver-Zombie.png",
            "images/ldor-Attendant.png",
            "images/Omega-Mind.png",
            "images/Prince-Keleseth.png",
            "images/Shadow-Slime.png",
            "images/Spirit-of-the-Frog.png",
            "images/Asvedon.png",
            "images/Crowley-Commander.png",
            "images/Dragon-Slayer.png",
            "images/Hagatha.png",
            "images/Hench-Clan-Thug.png",
            "images/Karath.png",
            "images/Kiri.png",
            "images/Knight-Chessman.png",
            "images/Lunar-Outlaw.png",
            "images/Maker-the-Rainbone.png",
            "images/Prince-Taldaram.png",
            "images/Treant-of-Forest.png",
            "images/Warmaul-Challenger.png",
            "images/Castle-Chessman.png",
            "images/E.T.C-Band-Manager.png",
            "images/Elise.png",
            "images/Flying-Broom.png",
            "images/Mr.-Slime.png",
            "images/Prince-Valanar.png",
            "images/Verdant-Fury.png",
            "images/Warlord.png",
            "images/Dollcrafter.png",
            "images/Lana'thel.png",
            "images/Leeroy.png",
            "images/Omega-Assasin.png",
            "images/Queen-Chessman.png",
            "images/Rafaam.png",
            "images/Venomous-Vines.png",
            "images/Brann.png",
            "images/Genn-Greymane.png",
            "images/Royal-Soldier.png",
            "images/Toki.png",
            "images/Zihi.png",
            "images/Alura.png",
            "images/Baku-Lengthy.png",
            "images/Dr.-Boom.png",
            "images/Guardian-of-Dragonic.png",
            "images/Headless-Night-Knight.png",
            "images/Valdis.png",
            "images/Zyphrix.png",
            "images/Devout-Pupil.png",
            "images/King-of-Chess-Board.png",
            "images/Reno.png",
            "images/Zephrys.png",
            "images/King-Togwaggle.png",
            "images/Chemspark.png",
            "images/Keymaster.png"
            // Thêm các đường dẫn ảnh khác vào đây
        ];

        applyImageOnclick(normalImages, 'normal-grid', 'normal');
        // Thêm tất cả các hình ảnh vào bảng
        normalImages.forEach(imagePath => {
            let imageElement = document.createElement('img');
            imageElement.src = imagePath;
            imageElement.alt = "Normal Image";
            imageElement.className = 'normal-image'; // Đảm bảo lớp này có trong CSS
            grid.appendChild(imageElement);
        });

                // Thêm lưới vào bảng trống
        table.appendChild(grid);

        // Thêm bảng vào vùng chứa
        container.appendChild(table);
    }

    if (subType === "Spell") {
        // Tạo bảng trống
        let table = document.createElement('div');
        table.className = 'blank-table'; // Sử dụng lớp CSS "blank-table" để thêm định dạng tùy chỉnh
        table.innerHTML = `<p></p>`;
    
            // Tạo phần tử chứa lưới hình ảnh Spell
        let grid = document.createElement('div');
        grid.className = 'all-grid';

        // Tạo danh sách các đường dẫn ảnh cho tộc "Spell"
        let spellImages = [
            "images/Behind.png",
            "images/Power-of-Dept.png",
            "images/Sacrificial-Pact.png",
            "images/Shadow-Step.png",
            "images/Soularium.png",
            "images/The-Palm-Coin.png",
            "images/Wanted.png",
            "images/Adorable-Infestation.png",
            "images/Binoculars.png",
            "images/Bottom-in-Bottle.png",
            "images/Flower-or-Knife.png",
            "images/Found-the-treasure.png",
            "images/One-Two-Three.png",
            "images/Shield-Crush.png",
            "images/Spread.png",
            "images/Throw-the-Rock.png",
            "images/Blooding-Hand.png",
            "images/Boomerang.png",
            "images/Call-of-Wild.png",
            "images/Curse-of-Wisp.png",
            "images/Gang-of-The-Imps.png",
            "images/Party-Pirate.png",
            "images/Plot-Twist.png",
            "images/Primal-Roar.png",
            "images/Radiant-Invocation.png",
            "images/Rainbone.png",
            "images/Root-out.png",
            "images/Trap.png",
            "images/Zoom-out.png",
            "images/Broken.png",
            "images/Distort.png",
            "images/Escape.png",
            "images/Hex.png",
            "images/Holy-Shield.png",
            "images/Ice-Block.png",
            "images/Invisible.png",
            "images/Last-Hope.png",
            "images/Lightning-Storm.png",
            "images/Pandemic-Murloc.png",
            "images/Proliferate.png",
            "images/So-Lusion.png",
            "images/Tryhard.png",
            "images/Assassination.png",
            "images/Cannon-Barrage.png",
            "images/Doomsday.png",
            "images/Fireball.png",
            "images/Flanking-Strike.png",
            "images/Hellfire.png",
            "images/Medkid.png",
            "images/Reattack.png",
            "images/Run-Away.png",
            "images/Dragonic-Potion.png",
            "images/Dragon's-Flame.png",
            "images/Evolution.png",
            "images/Sharp-Shark.png",
            "images/Beetlemancy.png",
            "images/Big-Difference.png",
            "images/Deck-of-Chaos.png",
            "images/Frog-Rain.png",
            "images/Hiddern-Oasis.png",
            "images/Lightbomb.png",
            "images/Disaster-of-Sea.png",
            "images/Dynamax.png",
            "images/Miracle-Growth.png",
            "images/Move-out.png",
            "images/Black-Hole.png",
            "images/Wheel-of-Death.png",
            "images/Mind-Control.png",
            "images/Pryoblast.png",
            "images/Savage-Ambush.png",
            "images/Soul-Rent.png",
           
            // Thêm các đường dẫn ảnh khác vào đây
        ];

        applyImageOnclick(spellImages, 'spell-grid', 'spell');
        // Thêm tất cả các hình ảnh vào bảng
        spellImages.forEach(imagePath => {
            let imageElement = document.createElement('img');
            imageElement.src = imagePath;
            imageElement.alt = "Spell Image";
            imageElement.className = 'spell-image'; // Đảm bảo lớp này có trong CSS
            grid.appendChild(imageElement);
        });

                // Thêm lưới vào bảng trống
        table.appendChild(grid);

        // Thêm bảng vào vùng chứa
        container.appendChild(table);
    }

    if (subType === "Weapon") {
        // Tạo bảng trống
        let table = document.createElement('div');
        table.className = 'blank-table'; // Sử dụng lớp CSS "blank-table" để thêm định dạng tùy chỉnh
        table.innerHTML = `<p></p>`;
    
            // Tạo phần tử chứa lưới hình ảnh Weapon
        let grid = document.createElement('div');
        grid.className = 'all-grid';

        // Tạo danh sách các đường dẫn ảnh cho tộc "Weapon"
        let weaponImages = [
            "images/Bench-Wrench.png",
            "images/Dragon-Flute.png",
            "images/Shuriken.png",
            "images/Gem-Puncher.png",
            "images/Handgun.png",
            "images/Murloc-Rod.png",
            "images/Piranha-Gun.png",
            "images/Ship-Anchor.png",
            "images/Battle-Axe.png",
            "images/Iron-Shield.png",
            "images/Jade-Claw.png",
            "images/Holy-Hammer.png",
            "images/Poison-Bow.png",
            "images/Twin-Slice.png",
            "images/Aluneth.png",
            "images/Mjolnir.png",
            "images/Rhok'delar.png",
            "images/Muramasa.png"
            // Thêm các đường dẫn ảnh khác vào đây
        ];

        applyImageOnclick(weaponImages, 'weapon-grid', 'weapon');
        // Thêm tất cả các hình ảnh vào bảng
        weaponImages.forEach(imagePath => {
            let imageElement = document.createElement('img');
            imageElement.src = imagePath;
            imageElement.alt = "Weapon Image";
            imageElement.className = 'weapon-image'; // Đảm bảo lớp này có trong CSS
            grid.appendChild(imageElement);
        });

                // Thêm lưới vào bảng trống
        table.appendChild(grid);

        // Thêm bảng vào vùng chứa
        container.appendChild(table);
    }

}

// Hàm mở modal khi bấm vào hình ảnh
function openModal(imagePath) {
    let modal = document.getElementById('imageModal');
    let modalContent = document.getElementById('modalImage');
    modalContent.src = imagePath; // Thiết lập đường dẫn hình ảnh cho modal
    modal.style.display = 'flex'; // Hiển thị modal
}

// Hàm đóng modal khi bấm vào nút hoặc bên ngoài hình ảnh
function closeModal() {
    let modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

// Áp dụng sự kiện `onclick` cho tất cả hình ảnh từ mọi tộc
function applyImageOnclick(imageArray, gridId, className) {
    let grid = document.getElementById(gridId);
    if (grid) {
        imageArray.forEach(imagePath => {
            let imageElement = document.createElement('img');
            imageElement.src = imagePath;
            imageElement.alt = `${className} Image`;
            imageElement.className = `${className}-image`;
            imageElement.onclick = () => openModal(imagePath); // Thêm sự kiện `onclick`
            grid.appendChild(imageElement);
        });
    }
}


