import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const jwtToken = Cookies.get('jwt_token')

  return (
    <Route
      {...rest}
      render={routeProps =>
        jwtToken !== undefined ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default ProtectedRoute
