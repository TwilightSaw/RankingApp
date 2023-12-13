import {useEffect, useState } from 'react'; 
import MovieImage from './MovieImages.js';
import RankingGrid from './RankingGrid.js';
import ItemCollection from './ItemCollection.js';
import Item from './Item.js'

const RankItems = ({items, setItems, dataType, imgArr, localStorageKey }) => {

    const [reload, setReload] = useState(false);

    function Reload() {
        setReload(true);
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }


    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
            ev.preventDefault();
        const targetElm = ev.target;
        if (targetElm.nodeName === "IMG") {
            return false;
        }
        if (targetElm.childNodes.length === 0) {
            var data = parseInt(ev.dataTransfer.getData("text").substring(5));
            const transformedCollection = items.map((item) => (item.id === parseInt(data)) ?
                { ...item, ranking: parseInt(targetElm.id.substring(5)) } : { ...item, ranking: item.ranking });
            setItems(transformedCollection);
        }
        }

    useEffect(() => {
        if (items == null) {
            getDataFromApi()
        }
        setReload(false);
    }, [dataType])

    useEffect(() => {
        if (reload === true) {
            getDataFromApi();

        }
    },[reload])

    function getDataFromApi() {
        fetch(`item/${dataType}`)
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setItems(data);
            })  
    }

    useEffect(() => {
        if (items != null) {
            localStorage.setItem(localStorageKey, JSON.stringify(items));
        }
    }, [items])

    return (
        (items != null) ?
            <main>
                <RankingGrid items={items} imgArr={imgArr} drag={drag} allowDrop={allowDrop} drop={drop} />
                <ItemCollection items={items} drag={drag} imgArr={imgArr} />
                <button className="reload" onClick={Reload} style={{"marginTop": "10px"} }><span class="text">Reload</span></button>
            </main>
            : <main>Loading...</main>
    )
}
export default RankItems;