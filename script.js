(() => {
  const steps = [
    {
      id: "01",
      eyebrow: "单机智能",
      title: ["一个机器人，", "看见一条路径。"],
      text: "AMC 完成自主导航、避障与基础巡检，能力仍被限制在单一设备和单条任务链中。",
      metric: "局部感知"
    },
    {
      id: "02",
      eyebrow: "多源互联",
      title: ["设备开始交换", "现场上下文。"],
      text: "机器人、传感器与机台共享状态，让每一次巡检都获得更完整的环境信息。",
      metric: "协同感知"
    },
    {
      id: "03",
      eyebrow: "全局协同",
      title: ["整个 Fab，", "成为一个智能体。"],
      text: "云边端协同调度，把分散的数据、策略与执行统一为连续的工厂级闭环。",
      metric: "全局智控"
    }
  ];

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.15 });
  document.querySelectorAll("[data-reveal]").forEach((item) => revealObserver.observe(item));

  const activate = (index) => {
    const step = steps[index];
    document.querySelector(".stage-counter span:first-child").textContent = step.id;
    document.querySelector(".stage-eyebrow").textContent = step.eyebrow;
    document.querySelector(".stage-copy h2").innerHTML =
      step.title.map((line) => "<span>" + line + "</span>").join("");
    document.querySelector(".stage-description").textContent = step.text;
    document.querySelector(".intelligence-visual > p").textContent = step.metric;
    document.querySelector(".orbital").className = "orbital orbital-" + index;
  };

  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) activate(Number(entry.target.dataset.stepIndex));
    });
  }, { rootMargin: "-42% 0px -42% 0px", threshold: 0 });
  document.querySelectorAll('[data-step-type="intelligence"]')
    .forEach((item) => stepObserver.observe(item));

  const menu = document.querySelector(".menu-button");
  const nav = document.querySelector(".nav-links");
  menu?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menu.setAttribute("aria-expanded", String(open));
  });
  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menu?.setAttribute("aria-expanded", "false");
    });
  });

  const syncScroll = () => {
    document.documentElement.style.setProperty("--page-scroll", String(window.scrollY));
  };
  window.addEventListener("scroll", syncScroll, { passive: true });
  syncScroll();
})();