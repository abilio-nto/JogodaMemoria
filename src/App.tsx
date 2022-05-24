import * as C from './App.styles';
import logoImage from './assets/devmemory_logo.png';
import {InfoItem} from './components/infoitem/index';
import Restaricon from './svgs/restart.svg';
import { Button } from './components/button';
const App = () => {

   const resetAndCreatGrid = () =>{

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
            ...
        </C.GridArea>
    </C.container>
  )
}

export default App