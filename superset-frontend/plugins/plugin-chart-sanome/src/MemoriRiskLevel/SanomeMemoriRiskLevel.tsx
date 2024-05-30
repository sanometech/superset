/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, createRef } from 'react';
import { computeMaxFontSize, styled } from '@superset-ui/core';
import { SanomeProps, SanomeStylesProps } from '../types';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<SanomeStylesProps>`
  padding: 0;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;

  .score-category {
    font-size: ${({ fontSize }) => fontSize}px;
  }
  .score-category.low {
    color: black;
  }
  .score-category.moderate {
    color: #FFAE42;
  }
  .score-category.high {
    color: #FC6600;
  }
  .score-category.critical {
    color: red;
  }
`;

export default function SanomeMemoriRiskLevel(props: SanomeProps) {
  const { data, height, width } = props;
  const rootElem = createRef<HTMLDivElement>();
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  });
  console.log('Plugin props', props);

  let [{ score_category: scoreCategory }] = data;
  if (typeof scoreCategory !== 'string') {
    console.warn(`Unexpected value for score category: ${scoreCategory}`);
    scoreCategory = '';
  }

  let fontSize = computeMaxFontSize({
    text: scoreCategory,
    maxWidth: width - 8,
    maxHeight: height,
  });
  fontSize = fontSize > 50 ? 50 : fontSize;

  return (
    <Styles
      ref={rootElem}
      height={height}
      width={width}
      fontSize={fontSize}
    >
      <h1 className={`score-category ${scoreCategory.toLowerCase()}`}>
        {scoreCategory.toUpperCase()}
      </h1>
    </Styles>
  );
}
