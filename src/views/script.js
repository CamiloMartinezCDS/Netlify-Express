const copyBtn = document.getElementById('copy-to-clipboard')
const copyText = document.getElementById('video-link-paragraph')

copyBtn.onclick = () => {
  copyText.select();
  document.execCommand('copy');
  const videoLink = copyText.innerText;
  const event = "Copied video link: "+videoLink;
  amplitude.getInstance().logEvent(event);
}
