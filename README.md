# Time-series forecasting through the lens of dynamics - ICML 2026

This repository contains the code developed for the paper "Time-series forecasting through the lens of dynamics" accepted at ICML 2026. It is based on this [repository](https://github.com/decisionintelligence/TFB/tree/master), developed for the TFB benchmark (Qiu et al. 2024).

## Installation

### Requirements

Please see the `requirements.txt` file. 

- tested on Python 3.9.7 and 3.10.7
- tested on PyTorch 1.12.1 and 2.1.2

Please refer to the original [repository](https://github.com/decisionintelligence/TFB/tree/master) detailed instruction guide to setup your environment, if needed.

## Datasets

All the datasets are accessible with the following link: [Google Drive](https://drive.google.com/file/d/1vgpOmAygokoUt235piWKUjfwao6KwLv7/view?usp=drive_link). Place the downloaded data under the folder `./dataset/forecasting/`. We provide it with the three lightest datasets ILI, NASDAQ and NYSE, with the meta data `FORECAST_META.scv` for the forecasting task, for convinience.

## Paper files description

From the `.\ts_benchmark\baselines\time_series_library\` folder, the models are in the `models` folder. Each model has a method for a specific time-series task. The time-series forecasting is inditified by the methods `forecast` or `short_term_forecast`.

## Get started

The train and test file is `adapters_for_transformers.py`, where default hyperparameters are set. 

The scripts, where the hyperparameters are indicated, are under the `.\scripts\multivariate_forecast\` folder. They are stored in `.sh` files. 

To run a model from the shell, follow this example: 
```shell
sh ./scripts/multivariate_forecast/ILI_script/Informer_DYN.sh
```
When running under pycharm, please escape the double quotes, remove the spaces, and remove the single quotes at the beginning and end.

Such as: **'{"d_ff": 2048, "d_model": 512, "horizon": 24}' ---> {\\"d_ff\\":2048,\\"d_model\\":512,\\"horizon\\":24}**

```shell
--config-path "rolling_forecast_config.json" --data-name-list "ILI.csv" --strategy-args {\"horizon\":24} --model-name "time_series_library.Informer_DYN" --model-hyper-params {\"d_ff\":2048,\"d_model\":512,\"factor\":3,\"horizon\":24,\"norm\":true,\"seq_len\":104} --adapter "transformer_adapter" --gpus 0 --num-workers 1 --timeout 60000 --save-path "ILI/Informer_DYN"
```

Once a model is run, results are stored in the `.\result\arg(save_path)` folder, where `arg(save_path)` is the path indicated in the `--save_path` argument when running the script. MSE and MAE are reported under `mse_norm` and `mae_norm`.

## Citation

If you find this repo useful, please cite our paper.

```
@misc{brachet2026timeseriesforecastinglensdynamics,
      title={Time-series forecasting through the lens of dynamics}, 
      author={Alexis-Raja Brachet and Pierre-Yves Richard and Céline Hudelot},
      year={2026},
      eprint={2507.15774},
      archivePrefix={arXiv},
      primaryClass={cs.LG},
      url={https://arxiv.org/abs/2507.15774}, 
}
```

## References

Qiu, X., Hu, J., Zhou, L., Wu, X., Du, J., Zhang, B., Guo, C., Zhou, A., Jensen, C. S., Sheng, Z., & Yang, B. (2024). TFB : Towards Comprehensive and Fair Benchmarking of Time Series Forecasting Methods. arXiv.org. https://arxiv.org/abs/2403.20150