// UserProfile.js
import React, { useEffect, useState } from 'react';
import { doc, getDocs, updateDoc, collection, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [editProfile, setEditProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async (uid) => {
            try {
                // Find the document that contains the specified UID
                const querySnapshot = await getDocs(collection(db, 'info'));
                let foundNationalID = null;

                querySnapshot.forEach((doc) => {
                    if (doc.data().uid === uid) {
                        foundNationalID = doc.id;
                    }
                });

                if (foundNationalID) {
                    // Fetch the document using the national ID
                    const docRef = doc(db, 'info', foundNationalID);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUserProfile({ id: foundNationalID, ...docSnap.data() });
                    } else {
                        console.log('No such document!');
                    }
                } else {
                    console.log('UID not found!');
                }
            } catch (err) {
                console.error('Error fetching document:', err);
                setError('Error fetching user profile.');
            }
        };

        onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserProfile(user.uid);
            } else {
                setError('No user is logged in.');
            }
        });
    }, []);

    const handleEditClick = () => {
        setEditProfile(userProfile);
    };

    const handleSave = async (updatedProfile) => {
        try {
            const profileRef = doc(db, 'info', updatedProfile.id);
            await updateDoc(profileRef, updatedProfile);
            setUserProfile(updatedProfile);
            setEditProfile(null);
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Error updating profile.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProfile({ ...editProfile, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(editProfile);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            {editProfile ? (
                <form onSubmit={handleSubmit}>
                    <h2>Edit Profile</h2>
                    <label>
                        Name:
                        <input type="text" name="name" value={editProfile.name} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Department:
                        <input type="text" name="department" value={editProfile.department} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        IDV:
                        <input type="text" name="idv" value={editProfile.idv} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Role:
                        <input type="text" name="role" value={editProfile.role} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Symptoms:
                        <input type="text" name="symptoms" value={editProfile.symptoms || ''} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Physical Examination:
                        <input type="text" name="physicalExamination" value={editProfile.physicalExamination || ''} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Diagnostic Tests:
                        <input type="text" name="diagnosticTests" value={editProfile.diagnosticTests || ''} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Assessment and Plan:
                        <input type="text" name="assessmentAndPlan" value={editProfile.assessmentAndPlan || ''} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Note:
                        <input type="text" name="note" value={editProfile.note || ''} onChange={handleChange} />
                    </label>
                    <br />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditProfile(null)}>Cancel</button>
                </form>
            ) : (
                <div>
                    <p>Name: {userProfile.name}</p>
                    <p>Department: {userProfile.department}</p>
                    <p>IDV: {userProfile.idv}</p>
                    <p>Role: {userProfile.role}</p>
                    <p>Symptoms: {userProfile.symptoms}</p>
                    <p>Physical Examination: {userProfile.physicalExamination}</p>
                    <p>Diagnostic Tests: {userProfile.diagnosticTests}</p>
                    <p>Assessment and Plan: {userProfile.assessmentAndPlan}</p>
                    <p>Note: {userProfile.note}</p>
                    <button onClick={handleEditClick}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
