const themeMap = {
    dark: "light",
    light: "solar",
    solar: "dark"
  };

  //const dark = document.querySelector("section.bubble")
  
  const theme = localStorage.getItem('theme')
    || (tmp = Object.keys(themeMap)[0],
        localStorage.setItem('theme', tmp),
        tmp);
  const bodyClass = document.body.classList;
  bodyClass.add(theme);
  
  function toggleTheme() {

    const current = localStorage.getItem('theme');
    console.log(themeMap[current])
    const next = themeMap[current];

    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);
    //if(themeMap[current] == "dark"){
      //console.log("balls")
      //dark.style.background= "#ffffff";
    //}
  }
  
  document.getElementById('themeButton').onclick = toggleTheme;