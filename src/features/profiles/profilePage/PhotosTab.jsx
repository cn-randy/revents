import React, {useState} from 'react';
import {Button, Card, Grid, Header, Image, Tab} from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/photos/PhotoUploadWidget";
import {useFirestoreCollection} from "../../../app/hooks/useFirestoreCollection";
import {useDispatch, useSelector} from "react-redux";
import {listenToUserPhotos} from "../profileActions";
import {deletePhotoFromCollection, getUserPhotos, setMainPhoto} from "../../../app/firestore/firestoreService";
import {toast} from "react-toastify";
import {deleteFromFirebaseStorage} from "../../../app/firestore/firebaseService";

const PhotosTab = ({profile, isCurrentUser}) => {
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()
    const {loading} = useSelector(state => state.async)
    const {photos} = useSelector(state => state.profile)
    const [updating, setUpdating] = useState({isUpdating: false, target: null})
    const [deleting, setDeleting] = useState({isDeleting: false, target: null})

    useFirestoreCollection({
        query: () => getUserPhotos(profile.id),
        data: photos => dispatch(listenToUserPhotos(photos)),
        dependencies: [profile.id, dispatch]
    })

    const handleSetMainPhoto = async (photo, target) => {
        setUpdating({isUpdating: true, target})

        try {
            await setMainPhoto(photo)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setUpdating({isUpdating: false, target: null})
        }
    }

    const handleDeletePhoto = async (photo, target) => {
        setDeleting({isDeleting: true, target})

        try {
            await deleteFromFirebaseStorage(photo.name)
            await deletePhotoFromCollection(photo.id)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setDeleting({isDeleting: false, target: null})
        }
    }

    return (
        <Tab.Pane loading={loading}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon="user" content={'Photos'}/>
                    {isCurrentUser &&
                    <Button
                        floated="right"
                        basic
                        content={editMode ? 'Cancel' : 'Add Photo'}
                        onClick={() => setEditMode(!editMode)}
                    />}

                </Grid.Column>
                <Grid.Column width={16}>
                    {editMode
                        ? <PhotoUploadWidget setEditMode={setEditMode}/>
                        : (
                            <Card.Group itemsPerRow={5}>
                                {photos.map(photo => (
                                    <Card key={photo.id}>
                                        <Image src={photo.URL}/>
                                        <Button.Group fluid widths={2}>
                                            <Button
                                                name={photo.id}
                                                loading={updating.isUpdating && updating.target === photo.id}
                                                basic
                                                color="green"
                                                content="Main"
                                                disabled={photo.URL === profile.photoURL}
                                                onClick={(e) => handleSetMainPhoto(photo, e.target.name)}
                                            />
                                            <Button
                                                name={photo.id}
                                                loading={deleting.isDeleting && deleting.target === photo.id}
                                                basic color="red" icon="trash"
                                                disabled={photo.URL === profile.photoURL}
                                                onClick={(e => handleDeletePhoto(photo, e.target.name))}
                                            />
                                        </Button.Group>
                                    </Card>
                                ))}
                            </Card.Group>
                        )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};

export default PhotosTab;