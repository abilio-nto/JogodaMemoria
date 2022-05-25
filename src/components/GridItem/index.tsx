import { GridItemType } from '../../types/GridItemTypes'
import * as C from './styles'
import b7Svg from '../../svgs/b7.svg'
import {items} from '../../data/items'

type Props ={
    item: GridItemType,
    onClick: () => void
}


export const GridItem = ({item, onClick}: Props) =>{
    return(
      <C.Container onClick={onClick} showBackGround={item.permanentShow || item.shown}>
          {!item.permanentShow && !item.shown &&
              <C.Icon src={b7Svg} opacity={.1} alt="" />
          }
          {(item.permanentShow || item. shown) && item.item !== null &&
              <C.Icon src={items[item.item].icon } alt=""/>
          }
      </C.Container>
    )
}