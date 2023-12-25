import React from 'react'
import RankingTable from '../components/RankingTable'
import { DiscAlbum, Home, BarChart4, CircleUserRound, Music, Trophy, PlusCircle, AudioLines, FolderClock } from "lucide-react";
import Sidebar from '../components/SideBar'
import { SidebarItem } from '../components/SideBar'
import {Link} from 'react-router-dom'

const HistoryMain = () => {
  return (
    <>
        <div className="flex">
        <Sidebar>
              <Link to='/'>
              <SidebarItem icon={<Home size={20} />} text="Home"/>
              </Link>
              <Link to='/songs'>
              <SidebarItem icon={<DiscAlbum size={20} />} text="Songs" />
              </Link>
              <Link to='/ranking'>
              <SidebarItem icon={<BarChart4 size={20} />} text="Ranking"/>
              </Link>
              <Link to='/awards'>
              <SidebarItem icon={<Trophy size={20} />} text="Awards" />
              </Link>
              <Link to='/addmusician'>
              <SidebarItem icon={<CircleUserRound size={20} />} text="+Singer" />
              </Link>
              <Link to='/addsong'>
              <SidebarItem icon={<Music size={20} />} text="+Song" />
              </Link>
              <Link to='/addpoints'>
              <SidebarItem icon={<PlusCircle size={20} />} text="+Item" />
              </Link>
              <hr className="my-3" />
              <Link to='/history'>
              <SidebarItem icon={<FolderClock size={20} />} text="History" />
              </Link>
              <Link to='https://open.spotify.com/intl-es'>
              <SidebarItem icon={<AudioLines size={20} />} text="Spotify" />
              </Link>
        </Sidebar>
        <div className='bg-base3 w-full overflow-y-auto h-screen'>
        <RankingTable></RankingTable>
        </div>
        </div>
        </>
  )
}

export default HistoryMain