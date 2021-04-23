import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { useConsultationDetail } from '../../api/Api';
import TwoRowTextBlock from '../Common/TwoRowTextBlock';
import { currencyFormat, dateFormat } from '../../util/Util';
import TwoRowListBlock from '../Common/TwoRowListBlock';
import TwoRowHyperlinkBlock from '../Common/TwoRowHyperLinkBlock';

const DetailPage = props => {
    const [detailRes, getDetail] = useConsultationDetail(props.navigation.getParam('id', 0));
    const [detail, setDetail] = useState({
        consultationId: 0,
        doctorName: '',
        patientName: '',
        dateTime: '',
        consultationFee: '',
        diagnosis: [],
        medication: [],
        followUp: []
    });

    useEffect(() => {
        getDetail();
    }, []);

    useEffect(() => {
        console.log(detailRes.data);
        setDetail({...detail, ...detailRes.data});
    }, [detailRes.data]);

    const onClickFollowUp = id => {
        console.log(id);
        props.navigation.navigate('Detail', { id: id });
    }

    const medication = mediData => `${mediData[0]}   ${mediData[1]}${mediData[2]}`
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TwoRowTextBlock title="Date" text={dateFormat(new Date(detail.dateTime))} />
            <TwoRowTextBlock title="Doctor" text={detail.doctorName} />
            <TwoRowTextBlock title="Patient" text={detail.patientName} />
            <TwoRowListBlock title="Diagnosis" list={detail.diagnosis} />
            <TwoRowListBlock title="Medication" list={detail.medication.map(medication)} />
            <TwoRowTextBlock title="Fee" text={currencyFormat(detail.consultationFee)} />
            {
                detail.followUp.length > 0 
                ?  <TwoRowHyperlinkBlock 
                        title="Follow Up" 
                        text={dateFormat(new Date(detail.followUp[1]))} 
                        onPress={() => onClickFollowUp(detail.followUp[0])}
                    /> 
                : null
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
});

export default DetailPage;