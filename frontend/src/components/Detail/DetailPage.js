import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useConsultationDetail } from '../../api/Api';
import TwoRowTextBlock from '../Common/TwoRowTextBlock';
import { currencyFormat, dateTimeFormat } from '../../util/Util';
import TwoRowListBlock from '../Common/TwoRowListBlock';
import TwoRowHyperlinkBlock from '../Common/TwoRowHyperLinkBlock';
import LoadingMask from '../Common/LoadingMask';

const DetailPage = props => {
    const [detailRes, getDetail] = useConsultationDetail();
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
        console.log('new id: ' + props.navigation.getParam('id', 0));
        getDetail(props.navigation.getParam('id', 0));
    }, [props.navigation.getParam('id', 0)]);

    useEffect(() => {
        console.log(detailRes.data);
        setDetail({...detail, ...detailRes.data});
    }, [detailRes.data]);

    const onClickFollowUp = id => {
        console.log(id);
        props.navigation.push('Detail', { id: id });
    }

    const medication = mediData => `${mediData[0]}   ${mediData[1]}${mediData[2]}`
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TwoRowTextBlock title="Date" text={dateTimeFormat(new Date(detail.dateTime))} />
            <TwoRowTextBlock title="Doctor" text={detail.doctorName} />
            <TwoRowTextBlock title="Patient" text={detail.patientName} />
            <TwoRowListBlock title="Diagnosis" list={detail.diagnosis} />
            <TwoRowListBlock title="Medication" list={detail.medication.map(medication)} />
            <TwoRowTextBlock title="Fee" text={currencyFormat(detail.consultationFee)} />
            {
                detail.followUp.length > 0 
                ?  <TwoRowHyperlinkBlock 
                        title="Follow Up" 
                        text={dateTimeFormat(new Date(detail.followUp[1]))} 
                        onPress={() => onClickFollowUp(detail.followUp[0])}
                    /> 
                : null
            }

            <LoadingMask visible={detailRes.isFetching} />
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
    }
});

export default DetailPage;