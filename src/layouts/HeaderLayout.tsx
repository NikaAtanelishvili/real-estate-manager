import redberryLogo from '@/assets/images/redberry-logo.png'
import { useNavigate } from 'react-router-dom'

const HeaderLayout: React.FC<{
  children: React.ReactNode
}> = props => {
  const navigate = useNavigate()

  return (
    <div>
      <header className="w-full border border-[#DBDBDB] px-40 py-9">
        <img
          className="cursor-pointer"
          onClick={() => navigate('/')}
          src={redberryLogo}
          alt="Redberry Logo"
        />
      </header>
      <main>{props.children}</main>
    </div>
  )
}

export default HeaderLayout
