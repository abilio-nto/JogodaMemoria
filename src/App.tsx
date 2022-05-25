import * as C from './App.styles';
import logoImage from './assets/devmemory_logo.png';
import {InfoItem} from './components/infoitem/index';
import Restaricon from './svgs/restart.svg';
import { Button } from './components/button';
import { useEffect, useState } from 'react';
import { GridItemType } from './types/GridItemTypes';
import { items } from './data/items';
import { GridItem } from './components/GridItem';
import { formatTimeElapsed } from './utils/formatTimeElapsed';
const App = () => {

  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

 useEffect(()=> resetAndCreatGrid(),[]);

 useEffect(()=>{
    const time =  setInterval(()=>{
        if(playing) setTimeElapsed(timeElapsed + 1)
    },1000)
    return ()=>clearInterval(time);
 },[playing, timeElapsed])

 useEffect(()=>{
    if(showCount === 2){
      let opened = gridItems.filter(filter => filter.shown === true)
      if(opened.length === 2){
       
        if(opened[0].item === opened[1].item){
          let tmpGrid = [...gridItems]
          for(let i in tmpGrid){
            if(tmpGrid[i].shown){
              tmpGrid[i].permanentShow = true
              tmpGrid[i].shown = false
            }
          }
          setGridItems(tmpGrid)
          setShowCount(0)
        }else{
            setTimeout(()=>{
              let tmpGrid = [...gridItems]
              for(let i in tmpGrid){
                tmpGrid[i].shown = false
              }
              setGridItems(tmpGrid)
              setShowCount(0)
            },1000)
          }
     
          setMoveCount(moveCount + 1)
      }
    }
 },[showCount, gridItems])

 useEffect(()=>{
     if(moveCount > 0 && gridItems.every(item=> item.permanentShow === true)){
       setPlaying(false)
     }
 })

   const resetAndCreatGrid = () =>{
     setTimeElapsed(0);
     setMoveCount(0);
     setShowCount(0);

     let tmpGrid : GridItemType[] = [];

    for(let i = 0; i<(items.length * 2); i++) tmpGrid.push({item: null, shown: false, permanentShow: false})
    
    for(let w = 0; w<2; w++){
        for(let i = 0; i < items.length; i++){
        let pos = -1;
          while( pos < 0 || tmpGrid[pos].item !== null){
            pos= Math.floor(Math.random() * (items.length * 2));
          }
          tmpGrid[pos].item = i;
        }
    }

    setGridItems(tmpGrid);


    setPlaying(true)

   }


   const handleItemClick = (index:number) =>{
       
            if(playing && index !== null && showCount < 2){
              let tmpGrid = [...gridItems];
              if(!tmpGrid[index].permanentShow && !tmpGrid[index].shown){
                tmpGrid[index].shown = true;
                setShowCount(showCount + 1);
              }
              setGridItems(tmpGrid);
            }
       
   }

  return (

    <C.container>
        <C.info>
           <C.LogoLink>
                 <img src={logoImage} width="200" alt=''/>
           </C.LogoLink>
           <C.InfoArea>
             <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)}/>
             <InfoItem label="Movimentos" value={moveCount.toString()}/>
           </C.InfoArea>
           <Button label="Reiniciar" icon={Restaricon} onClick={resetAndCreatGrid}/>
        </C.info>
        <C.GridArea>
           <C.Grid>
              {gridItems.map((item,index)=>(
                <GridItem key={index} item={item} onClick={() => handleItemClick(index)}  />
              ))}
           </C.Grid>
        </C.GridArea>
    </C.container>
  )
}

export default App