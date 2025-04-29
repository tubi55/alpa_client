import { API_URL } from "./config.js";

//페이지 로드 시 자동 실행
document.addEventListener("DOMContentLoaded", async () => {
  const [keyArr, valArr] = await loadAllUsers();
  //위의 함수로 DB부터 반환하는 2개의 배열값을 동기적으로 받아서 내부에서 활용
  drawChart(keyArr, valArr);
});

// DB에서 모든 유저 데이터 가져온뒤 컬러정보에 관한 colorValue, colorKey를 각각 배열로 반환하는 함수
// [keyArr, valArr];
async function loadAllUsers() {
  const res = await fetch(`${API_URL}/api/admin/all`, {
    method: "GET",
    credentials: "include",
  });

  const users = await res.json();
  const colorData = {};

  users.forEach((user) => {
    const colorKey = user.colors;

    if (colorData[colorKey]) {
      colorData[colorKey] += 1;
    } else {
      colorData[colorKey] = 1;
    }
  });

  const keyArr = Object.keys(colorData);
  const valArr = Object.values(colorData);
  return [keyArr, valArr];
}

function drawChart(keyArr, valArr) {
  //const dataset = [600, 150, 80, 180, 280];

  render();
  window.addEventListener("resize", render);

  function render(opt) {
    let defaultOpt = { initPos: 100, gap: 50, interval: 300, speed: 1000 };
    if (opt instanceof Event) opt = {};
    const { initPos, gap, interval, speed } = { ...defaultOpt, ...opt };

    const svg = d3.select("svg");
    const svgWid = svg.node().getBoundingClientRect().width;
    const svgHt = svg.node().getBoundingClientRect().height;

    const barWid =
      (svgWid - (initPos * 2 + gap * (valArr.length - 1))) / valArr.length;

    //높이값 퍼센트 변환 함수
    const yPercent = d3
      .scaleLinear()
      .domain([0, d3.max(valArr)])
      .range([0, svgHt - 30]);

    //리사이즈 될때마다 기존 text, react요소를 svg안쪽에 제거해서 초기화
    svg.selectAll("text").remove();
    svg.selectAll("rect").remove();

    //새로 갱신된 svgHt값으로 text, rect다시 그리기
    svg
      .selectAll("rect")
      .data(valArr)
      .enter()
      .append("rect")
      .attr("y", svgHt)
      .attr("x", (d, i) => i * (barWid + gap) + initPos)
      .attr("height", 0)
      .attr("width", barWid)
      .attr("fill", (d, i) => keyArr[i])
      .transition()
      .delay((d, i) => interval * i) //첫번째바는 바로모션시작, 2번째 바는 0.2초이따 모션시작
      .duration(speed)
      .attr("height", (d) => yPercent(d))
      .attr("y", (d, i) => svgHt - yPercent(d));

    //텍스트 출력
    svg
      .selectAll("text")
      .data(valArr)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("y", (d) => svgHt - yPercent(d) + 30)
      .attr("x", (d, i) => i * (barWid + gap) + initPos + barWid / 2)
      .attr("font-size", "16px")
      .attr("fill", "transparent")
      .attr("text-anchor", "middle")
      .transition()
      .delay((d, i) => i * interval + speed)
      .duration(speed)
      .attr("fill", "black");

    svg
      .selectAll(".labelText") // 클래스명 추가
      .data(keyArr)
      .enter()
      .append("text")
      .attr("class", "labelText")
      .text((d) => d)
      .attr("y", svgHt - 10) // 막대 아래쪽에 배치
      .attr("x", (d, i) => i * (barWid + gap) + initPos + barWid / 2)
      .attr("font-size", "14px")
      .attr("fill", "black")
      .attr("text-anchor", "middle");
  }
}
