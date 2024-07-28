const conversPagination =function(resource , currentPage){
   // 分頁
    const totalResult = resource.length;
    const perpage = 3; // 每頁3筆
    const perpageTotal = Math.ceil(totalResult / perpage);
    // const currentPage = 1;
    if(currentPage > perpageTotal) {
      currentPage = perpageTotal
    }

    const miniitem = (currentPage * perpage) - perpage + 1;
    const maxitem = (currentPage * perpage);
    const data =[];
    resource.forEach((item, i)=>{
      let itemNum = i + 1;
      if (itemNum >= miniitem && itemNum<= maxitem){
        data.push(item)
      }
    });
    const page = {
      perpageTotal,
      currentPage,
      hasPer: currentPage > 1,
      hasNex: currentPage < perpageTotal
     }

     return{
        page,
        data
     }

    // 分頁結束 
}

module.exports = conversPagination;