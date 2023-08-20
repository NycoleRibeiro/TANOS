import { BlurLoader } from '../../components/loaders/blurLoader'

export const LoadingPage = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      backgroundColor: '#1D1A22'
    }}>
        <BlurLoader />
    </div>
  )
}
