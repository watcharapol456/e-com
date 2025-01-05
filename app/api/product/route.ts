
export async function GET() {
    const data = [
        {
            id : "1",
            key : "1",
            imgURL : "/assets/ceMYv-H5.jpg",
            labelName : "น้ำมันไพล",
            labelPrice : "10",
        },
        {
            id : "2",
            key : "2",
            imgURL : "/assets/DK0PMuFQ.jpg",
            labelName : "น้ำหมักชีวภาพ",
            labelPrice : "10",
        },
        {
            id : "3",
            key : "3",
            imgURL : "/assets/MmektI_e.jpg",
            labelName : "น้ำมันไพลแบบใหญ่",
            labelPrice : "10",
        },
        {
            id : "4",
            key : "4",
            imgURL : "/assets/Xj1PztBi.jpg",
            labelName : "มูลไส้เดือน",
            labelPrice : "10",
        },
    ] 
  
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  }
  