import * as C from './App.styles';
import logoImage from './assets/devmemory_logo.png';
import {InfoItem} from './components/infoitem/index';
import Restaricon from './svgs/restart.svg';
import { Button } from './components/button';
import { useEffect, useState } from 'react';
import { GridItemType } from './types/GridItemTypes';
import { items } from './data/items';
import { GridItem } from './components/GridItem';
const App = () => {

  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

 useEffect(()=> resetAndCreatGrid(),[])

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


   const handleItemClick = (i:number) =>{

   }

  return (

    <C.container>
        <C.info>
           <C.LogoLink>
                 <img src={logoImage} width="200" alt=''/>
           </C.LogoLink>
           <C.InfoArea>
             <InfoItem label="Tempo" value="00:00"/>
             <InfoItem label="Movimentos" value="0"/>
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