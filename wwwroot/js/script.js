const downloadBtn = document.querySelector(".download-btn");
const fileLink = "https://www.mediafire.com/file/nrc8p4jxeajqjhk/Minecraft_v1.19.63.01_64bit.apk/file";

const initTimer = () => {
    if(downloadBtn.classList.contains("disable-timer")) {
        return location.href = fileLink;
    }
    let timer = downloadBtn.dataset.timer;
    downloadBtn.classList.add("timer");
    downloadBtn.innerHTML = `<b>${timer}</b> seconds`;
    const initCounter = setInterval(() => {
        if(timer > 0) {
            timer--;
            return downloadBtn.innerHTML = `<b>${timer}</b> seconds`;
        }
        clearInterval(initCounter);
        location.href = fileLink;
        downloadBtn.innerText = "Your file is downloading...";
        setTimeout(() => {
            downloadBtn.classList.replace("timer", "disable-timer");
            downloadBtn.innerHTML = `<span class="icon material-symbols-rounded"></span>
                                     <span class="text">Download Again</span>`;
        }, 3000);
    }, 1000);
}

downloadBtn.addEventListener("click", initTimer);

const cnPopupOverlay = document.querySelector(".cn-popup-overlay"),
cnDownloadBtn = document.querySelector(".download-btn-ctm button");

let counter = cnDownloadBtn?.hasAttribute("data-time")
  ? cnDownloadBtn.dataset.time
  : 30;
let driveDownloadLink = "https://drive.google.com/uc?export=download&id=";
let dfileLink = cnDownloadBtn?.getAttribute("data-link");
let randomId = Math.random().toString(36).substring(7);

const isAdblockEnabled = async () => {
  let adBlockEnabled = false;
  const googleAdUrl =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";

  try {
    await fetch(new Request(googleAdUrl)).catch((_) => (adBlockEnabled = true));
  } catch (e) {
    adBlockEnabled = true;
  }
  const adIframe = document.querySelector(".adsbygoogle iframe");
  if ((adBlockEnabled || !adIframe) && window.innerWidth > 800) {
    return (adBlockEnabled = true);
  }

  return (adBlockEnabled = false);
};

const showPopup = (text) => {
  const popupDesc = cnPopupOverlay.querySelector(".description");
  popupDesc.innerHTML = `Our website is made possible by displaying ads. Please whitelist our site to ${text} given source codes. <a href='https://www.codinglabweb.com/p/adblock-consent-dear-visitor-were-so.html' target='_blank'>Read more</a>`;
  cnPopupOverlay.classList.add("show");
  document.body.style.overflowY = "hidden";
};

const hidePopup = () => {
  cnPopupOverlay.classList.remove("show");
  document.body.style.overflowY = "auto";
};

const handleDownloadCode = async (e) => {
    const isAdblock = await isAdblockEnabled();
    if (isAdblock) {
        return showPopup("download");
    }

    if (e.target.classList.contains(randomId)) {
        return (window.location.href =
        dfileLink.indexOf("drive") != -1
            ? dfileLink
            : driveDownloadLink + dfileLink);
    }
    cnDownloadBtn.classList.add("timer");
    cnDownloadBtn.innerHTML = `Your download will begin in <span>${counter}</span> seconds.`;
    let startCounter = setInterval(() => {
        counter--;
        cnDownloadBtn.innerHTML = `Your download will begin in <span>${counter}</span> seconds.`;
        if (counter <= 0) {
            clearInterval(startCounter);
            window.location.href =
                dfileLink.indexOf("drive") != -1
                ? dfileLink
                : driveDownloadLink + dfileLink;
            cnDownloadBtn.innerText = "Downloading the file...";

            setTimeout(() => {
                counter = 0;
                cnDownloadBtn.classList.replace("timer", randomId);
                cnDownloadBtn.innerText = "Download Again";
                cnDownloadBtn.insertAdjacentHTML(
                "afterbegin",
                `<i class='fas fa-download'></i>`
                );
            }, 3000);
        }
    }, 1200);
};