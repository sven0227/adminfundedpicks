'use client'

// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

// Component Imports
import Loader from '@/components/loader'
import { useGetUserQuery, useUpdateUserMutation } from '@/redux-store/api/user'

const Documents = () => {
  const { id } = useParams()
  const { data: userData, isLoading } = useGetUserQuery(id)
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
  const [docsData, setDocsData] = useState([]);
  const router = useRouter()

  useEffect(() => {
    if (userData) {
      setDocsData(userData.docs);
    }
  }, [userData])

  if (isLoading) {
    return <Loader />
  }

  const handleApprove = (status) => {
    updateUser({ id, data: { 'approved_for_phase2': status === 0 ? true : status === 1 ? false : null } })
      .then(response => {
        router.push('/applications')
      })
      .catch(error => {
        // Handle error
        console.error('Error updating user:', error);
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        {docsData.length > 0 && docsData.map((doc, index) => {
          const isImage = doc.file_url.endsWith('.png') || doc.file_url.endsWith('.jpg') || doc.file_url.endsWith('.jpeg');
          const fileUrl = `https://api.fundedpicks.com/${doc.file_url}`;

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent className='flex flex-col items-center'>
                  <Typography variant="h6" gutterBottom>
                    {doc.title}
                  </Typography>
                  <Link href={fileUrl} target="_blank" rel="noopener noreferrer">
                    <Typography variant="body2" color="textSecondary">
                      View Document
                    </Typography>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          );
        })}

      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ my: 3 }}>
          <CardContent className='flex flex-col items-center'>
            <Typography variant="h6" gutterBottom>
              SSN
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {userData.ssn}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ my: 3 }}>
          <CardContent className='flex flex-col items-center'>
            <Typography variant="h6" gutterBottom>
              Account Number
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {userData.account_number}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ my: 3 }}>
          <CardContent className='flex flex-col items-center'>
            <Typography variant="h6" gutterBottom>
              Routing Number
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {userData.routing_number}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid container sx={{ mt: 4 }} display={'flex'} justifyContent={'space-around'}>
        <Button variant="contained" color="primary" onClick={() => handleApprove(0)}>
          Approve
        </Button>
        <Button variant="contained" color="error" onClick={() => handleApprove(1)}>
          Deny
        </Button>
      </Grid>
    </>
  )
}

export default Documents
