
const RankingGrid = ({ items, imgArr, drag, allowDrop, drop  }) => {

    const rankingGrid = [];
    const cellCollectionTop = [];
    const cellCollectionMiddle = [];
    const cellCollectionBottom = [];
    const cellCollectionWorst = [];



    function pushCellMarkupToArr(cellCollection, rankNum, rowLabel) {
        console.log(`Pushing cell with rankNum: ${rankNum} and rowLabel: ${rowLabel}`);
        if (rankNum > 0) {
            var item = items.find(x => x.ranking === rankNum);
            cellCollection.push(<div id={`rank-${rankNum}`} onDrop={drop} onDragOver={allowDrop} className="rank-cell">
            {
                (item != null) ? <img id={`item-${item.id}`} src={imgArr.find(x => x.id === item.imageId)?.image} draggable="true" onDragStart={drag } /> 
                : null}
        </div >);
        }
        else{
            cellCollection.push(<div className="row-label">
                <h4>{rowLabel}</h4>
            </div>);
        }
    }


    function createCells(rowNum) {

        var rankNum = 0;
        var currCollection = [];
        var label = "";
        const numCells = 5;

        for (var a = 1; a <= numCells; a++) {
            rankNum = (a === 1) ? 0 : (numCells * (rowNum - 1)) + a - rowNum;

            if (rowNum === 1) {
                currCollection = cellCollectionTop;
                label = "Top";
            } else if( rowNum === 2) {
                currCollection = cellCollectionMiddle;
                label = "Middle";
            } else if( rowNum === 3) {
                currCollection = cellCollectionBottom;
                label = "Bottom";
            } else if( rowNum === 4) {
                currCollection = cellCollectionWorst;
                label = "Worst";
            }

            //label = ((rowNum === 1) ? "Top" : (rowNum === 2) ? "Middle" : (rowNum === 3)) ? "Bottom" : "Worst";
            //currCollection = ((rowNum === 1) ? cellCollectionTop : (rowNum === 2) ? cellCollectionMiddle : (rowNum === 3)) ? cellCollectionBottom : cellCollectionWorst;
            pushCellMarkupToArr(currCollection, rankNum, label);
        }
    }



    function createCellRows() {
        const maxRows = 5;
        for(var row = 0; row < maxRows; row++) {
            createCells(row);
        }

        
    }


    function createRowsForGrid() {

        rankingGrid.push(<div className="rank-row top-tier">{cellCollectionTop}</div>);
        rankingGrid.push(<div className="rank-row middle-tier">{cellCollectionMiddle}</div>);
        rankingGrid.push(<div className="rank-row bottom-tier">{cellCollectionBottom}</div>);
        rankingGrid.push(<div className="rank-row worst-tier">{cellCollectionWorst}</div>);

        return rankingGrid;
    }

    function createRankingGrid() {
        createCellRows();
        return createRowsForGrid();
    }

    return (
        <div className="rankings">
            {createRankingGrid() }
        </div>

    )
}

export default RankingGrid;