import redberryLogo from '@/assets/images/redberry-logo.png'

const HeaderLayout: React.FC<{
  children: React.ReactNode
}> = props => {
  return (
    <div>
      <header className="w-full border border-[#DBDBDB] px-40 py-9">
        <img className="" src={redberryLogo} alt="Redberry Logo" />
      </header>
      <main>{props.children}</main>
    </div>
  )
}

export default HeaderLayout
