window.addEventListener("load", () => {
  const createJokerGif = () => {
    const img = document.createElement("img");
    img.src = "./images/joker.gif";
    img.id = "joker-gif";
    // <img src="./images/joker.gif" id="joker-gif" class="hidden group-hover:block" />
  };

  const timeInfo = {
    star: 0,
    end: 149,
    current: 0,
    status: false,
  };

  const updateTime = (current) => {
    timeInfo.current = current;
  };

  const jokerGifPath = (time) => {
    // 始终让时间为三位数
    if (time < 10) {
      time = `00${time}`;
    } else if (time < 100) {
      time = `0${time}`;
    }
    return `/images/joker-gif/frame_${time}_delay-0.02s.gif`;
  };

  const getStyle = (path) => {
    return `background-image: url(${path});`;
  };

  //设置定时器，每隔0.02s更新一次gif

  //这里会有白色闪烁，因为图片是从0开始的，所以会有一瞬间的白色，需要预先把图片加载好
  //存储到数组中，然后再加载,存储为base64
  const images = [];

  const reloadImages = () => {
    for (let i = 0; i <= timeInfo.end; i++) {
      const img = new Image();
      img.src = jokerGifPath(i);
      img.onload = () => {
        images.push(jokerGifPath(i));
      };
    }
  };
  reloadImages();
  let autoUpdate;

  const autoPlayGif = () => {
    autoUpdate = setInterval(() => {
      if (timeInfo.current < timeInfo.end) {
        console.log(timeInfo.current);
        updateTime(timeInfo.current + 1);
      } else {
        updateTime(timeInfo.star);
      }
      jokerImg.src = jokerGifPath(timeInfo.current);
    }, 20);
  };

  const jokerImg = document.querySelector("#joker");
  const jokerAudio = document.querySelector("#joker-audio");

  const pause = () => {
    clearInterval(autoUpdate);
    jokerAudio.pause();
  };
  const play = () => {
    autoPlayGif();
    //   jokerAudio.currentTime = 0;
    jokerAudio.play();
  };

  jokerImg.addEventListener("click", () => {
    //重置音频时间

    //播放gif和暂停gif
    if (timeInfo.status) {
      pause();
    } else {
      play();
    }
    timeInfo.status = !timeInfo.status;
  });
  const downloadJokerBtn = document.querySelector('#download-img-btn')
  downloadJokerBtn.addEventListener('click',()=>{
    pause()
    const a = document.createElement('a')
    a.href = images[timeInfo.current]
    a.download = '自怕照.gif'
    a.click()

  })
});
