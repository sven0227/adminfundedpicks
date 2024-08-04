// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import { useTheme } from '@mui/material/styles'
import Chip from '@mui/material/Chip'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// import { GenerateVerticalMenu } from '@components/GenerateMenu'
// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ dictionary, scrollMenu }) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { settings } = useSettings()
  const params = useParams()
  const { isBreakpointReached } = useVerticalNav()

  // Vars
  const { transitionDuration } = verticalNavOptions
  const { lang: locale, id } = params
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 17 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-fill' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href='/' icon={<i className='ri-dashboard-horizontal-fill' />}>
          Dashboard
        </MenuItem>
        <MenuItem href='/purchases' icon={<i className='ri-wallet-3-fill' />}>
          Purchases
        </MenuItem>
        <SubMenu label='Demo Accounts' icon={<i className='ri-account-pin-circle-fill' />}>
          <MenuItem href='/accounts/inprogress'>In Progress</MenuItem>
          <MenuItem href='/accounts/passed'>Passed</MenuItem>
          <MenuItem href='/accounts/failed'>Failed</MenuItem>
          <MenuItem href='/accounts/profit'>Profit</MenuItem>
          <MenuItem href='/accounts/withdrawal'>Withdrawals</MenuItem>
        </SubMenu>
        {/* <MenuItem href='/withdrawal-profit' icon={<i className='ri-archive-drawer-fill' />}>
          Withdrawals Profit
        </MenuItem> */}
        <SubMenu label='Users' icon={<i className='ri-user-3-fill' />}>
          <MenuItem href='/users'>Users</MenuItem>
          {/* <MenuItem
            href='/prop-accounts/events
'
          >
            Events/Trades
          </MenuItem>

          <MenuItem
            href='/prop-accounts/calender
'
          >
            Calendar
          </MenuItem>
          <MenuItem
            href='/prop-accounts/stats
'
          >
            Stats
          </MenuItem>
          <MenuItem
            href='/prop-accounts/snapshot
'
          >
            Snapshot
          </MenuItem>*/}
          <MenuItem
            href='/prop-accounts/ip-logs
'
          >
            IP logs
          </MenuItem>
          {/* <MenuItem
            href='/prop-accounts/passwords
'
          >
            Password
          </MenuItem> */}
        </SubMenu>

        <MenuItem href='/bets' icon={<i className='ri-cash-line' />}>
          Bets
        </MenuItem>
        <SubMenu label='Reports' icon={<i className='ri-git-repository-fill' />}>
          <MenuItem href='/report/spenders'>Top spenders</MenuItem>
          <MenuItem href='/report/users'>Global user report</MenuItem>
        </SubMenu>
        <MenuItem href='/applications' icon={<i className='ri-voice-recognition-line' />}>
          Applications
        </MenuItem>
        <MenuItem href='/commerce' icon={<i className='ri-voice-recognition-line' />}>
          Commerce
        </MenuItem>

        {/* <MenuItem href='/coupons' icon={<i className='ri-terminal-window-line' />}>
          Coupons
        </MenuItem> */}
        {/* <MenuItem href='/affiliates' icon={<i className='ri-chat-poll-line' />}>
          Affiliates
        </MenuItem> */}

        {/* <SubMenu label='Payouts' icon={<i className='ri-money-dollar-circle-fill' />}>
          <MenuItem
            href='/payout/pendings
'
          >
            Pending
          </MenuItem>
          <MenuItem
            href='/payout/rejected
'
          >
            Rejected
          </MenuItem>
          <MenuItem
            href='/payout/approved
'
          >
            Approved
          </MenuItem>
          <MenuItem
            href='/payout/paid
'
          >
            Paid
          </MenuItem>
          <MenuItem
            href='/payout/unpaid
'
          >
            Unpaid
          </MenuItem>
        </SubMenu>
        <MenuItem href='/blacklister' icon={<i className='ri-chat-off-fill' />}>
          Blacklister
        </MenuItem> */}
      </Menu>
      {/* <Menu
          popoutMenuOffset={{ mainAxis: 17 }}
          menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
          renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
          renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-fill' /> }}
          menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
        >
          <GenerateVerticalMenu menuData={menuData(dictionary, params)} />
        </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
