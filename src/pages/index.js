import React, {useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeEditor from "@site/src/components/CodeEditor";


import styles from './index.module.css';

const code = `import numpy as np
import py4DSTEM
print(py4DSTEM.__version__)

gdrive_id ="1C3tXV5BXz0JXbmyu3wTu3NutuIYYsN8A"
cors_proxy = "https://corsproxy.io/?"
file_data = 'ptycho_MoS2_bin2.h5'

# download the 4DSTEM dataset
py4DSTEM.io.gdrive_download(
    id_ = f"{cors_proxy}https://drive.google.com/uc?id={gdrive_id}",
    filename = file_data,
    overwrite=True
)


dataset = py4DSTEM.read(file_data)

ptycho = py4DSTEM.process.phase.SingleslicePtychographicReconstruction(
    datacube=dataset,
    energy = 80e3,
    semiangle_cutoff = 21.4,
    object_type='potential',
    object_padding_px = (0,0),
).preprocess(
    plot_center_of_mass = False,
    plot_probe_overlaps = False,
    force_com_rotation = 30,
    force_com_transpose = False,
    fit_function="constant",
).reconstruct(
    reset = True,
    store_iterations = False,
    max_iter = 4,
    max_batch_size = 510,
    gaussian_filter_sigma = 0.3,
)

print(ptycho.error_iterations)
`

export default function Home() {
    return (
        <Layout title="Interactive Presentation Template">
            <main>
                <div className={styles.heroContainer}>
                    <h1>Python Docusaurus Template</h1>
                    <p className={styles.tagline}>A Docusaurus template for interactive presentations with runnable and editable Python and Javascript code blocks.</p>
                    <Link className={"button button--primary"} href={"slides/outline"}>Get Started</Link>
                    <div className={styles.codeEditorWrapper}>
                        <CodeEditor code={code} metastring='packages="https://raw.githubusercontent.com/gvarnavi/py4DSTEM-lite/phase_contrast/dist/py4DSTEM-0.14.9-py3-none-any.whl"'/>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
