import React, { useState } from 'react';
import Collapsible from 'react-native-collapsible';
import MapIcon from '../../../assets/icons/map.svg';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/styles';
import Store from '../../models/Store';
import moment from 'moment';

const StoreCard = ({ name, address, opens, contactNumber, email }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <View style={[styles.rowAllCenter, styles.mb20]}>
      <View style={[styles.flex2]}>
        <Text style={[styles.bold, styles.f16]}>{name}</Text>
        <Text style={[styles.normal, styles.f12, styles.mb20]}>{address}</Text>
        {
          opens?.length > 0 && (
            <>
              <TouchableOpacity onPress={() => setIsCollapsed((prev) => !prev)} activeOpacity={0.9}>
                <Text style={[styles.normal, styles.f12, styles.textPrimary]}>Open Hour</Text>
              </TouchableOpacity>
              <Collapsible collapsed={isCollapsed}>
                {
                  opens.map((open) => (
                    <Text key={`open-${open.id}`} style={[styles.normal, styles.f12]}>
                      {Store.DAYS[parseInt(open.day) - 1]}: {moment(open.start_at, 'H:m:s').format('h:m A')} - {moment(open.end_at, 'H:m:s').format('h:m A')}
                    </Text>
                  ))
                }
              </Collapsible>
            </>
          )
        }
        <Text style={[styles.normal, styles.f12]}>Call us on: {contactNumber}</Text>
        <Text style={[styles.normal, styles.f12]}>Email: {email}</Text>
      </View>
      <View style={[styles.flex1, { alignItems: 'flex-end' }]}>
        <TouchableOpacity>
          <MapIcon width={40} height={40} />
        </TouchableOpacity>
      </View>
    </View>
  )
};

StoreCard.defaultProps = {
  opens: []
};

export default StoreCard;